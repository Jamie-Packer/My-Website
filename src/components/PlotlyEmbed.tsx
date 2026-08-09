"use client";

// Embeds a standalone Plotly HTML export via iframe.
// Keeps the figure's designed pixel size and uniformly scales it (no
// Plotly autosize squish). Wide figures break out of the article column
// so labels/buttons stay readable.

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** Path under /public, e.g. /plots/pca3d_t.html */
  src: string;
  title?: string;
  caption?: string;
  /**
   * Optional max height (px) for the frame. If omitted, height follows the
   * scaled figure so width-fit never compresses the plot layout.
   */
  height?: number;
  /**
   * Break out of the article column up to the figure's natural width
   * (capped by the viewport). Default true — better for wide Plotly exports.
   */
  wide?: boolean;
  className?: string;
};

type PlotlyGd = HTMLElement & {
  _fullLayout?: { width?: number; height?: number };
};

const FIT_STYLE_ID = "plotly-embed-fit";

function injectBaseStyles(doc: Document) {
  if (doc.getElementById(FIT_STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = FIT_STYLE_ID;
  style.textContent = `
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      background: #161616;
    }
  `;
  doc.head.appendChild(style);
}

function readNaturalSize(doc: Document): { w: number; h: number } | null {
  const gd = doc.querySelector<PlotlyGd>(".js-plotly-plot, .plotly-graph-div");
  if (!gd) return null;

  const layoutW = gd._fullLayout?.width;
  const layoutH = gd._fullLayout?.height;
  const styleW = Number.parseFloat(gd.style.width);
  const styleH = Number.parseFloat(gd.style.height);
  const rect = gd.getBoundingClientRect();

  const w = layoutW || styleW || rect.width || gd.offsetWidth;
  const h = layoutH || styleH || rect.height || gd.offsetHeight;
  if (!w || !h) return null;
  return { w, h };
}

export default function PlotlyEmbed({
  src,
  title = "Interactive Plotly chart",
  caption,
  height: maxHeight,
  wide = true,
  className = "",
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef<number | null>(null);

  const [natural, setNatural] = useState({ w: 980, h: 720 });
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [ready, setReady] = useState(false);

  const applyScale = useCallback(() => {
    const iframe = iframeRef.current;
    const frame = frameRef.current;
    if (!iframe || !frame) return false;

    const doc = iframe.contentDocument;
    if (!doc?.body) return false;

    injectBaseStyles(doc);
    const size = readNaturalSize(doc);
    if (!size) return false;

    const availW = frame.clientWidth;
    if (availW <= 0) return false;

    // Uniform scale only — never Plotly.relayout autosize (that squishes UI).
    let nextScale = availW / size.w;
    if (maxHeight != null && maxHeight > 0) {
      nextScale = Math.min(nextScale, maxHeight / size.h);
    }
    // Don't upscale past native resolution
    nextScale = Math.min(1, nextScale);

    const displayW = size.w * nextScale;
    setNatural(size);
    setScale(nextScale);
    setOffsetX(Math.max(0, (availW - displayW) / 2));
    setReady(true);
    return true;
  }, [maxHeight]);

  const scheduleFit = useCallback(() => {
    if (applyScale()) return;

    let attempts = 0;
    if (retryRef.current != null) window.clearInterval(retryRef.current);
    retryRef.current = window.setInterval(() => {
      attempts += 1;
      if (applyScale() || attempts > 50) {
        if (retryRef.current != null) window.clearInterval(retryRef.current);
        retryRef.current = null;
      }
    }, 100);
  }, [applyScale]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const ro = new ResizeObserver(() => {
      applyScale();
    });
    ro.observe(frame);

    return () => {
      ro.disconnect();
      if (retryRef.current != null) window.clearInterval(retryRef.current);
    };
  }, [applyScale]);

  const frameHeight = Math.round(natural.h * scale);

  return (
    <figure
      className={
        wide
          ? `relative left-1/2 my-8 w-screen max-w-[100vw] -translate-x-1/2 px-4 ${className}`
          : `my-8 ${className}`
      }
    >
      <div className="mx-auto w-full" style={{ maxWidth: natural.w }}>
        <div
          ref={frameRef}
          className="relative w-full overflow-hidden rounded-lg border border-foreground/10 bg-background2"
          style={{ height: frameHeight || maxHeight || 400 }}
        >
          <iframe
            ref={iframeRef}
            src={src}
            title={title}
            className="absolute top-0 border-0"
            style={{
              left: offsetX,
              width: natural.w,
              height: natural.h,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              opacity: ready ? 1 : 0,
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            onLoad={scheduleFit}
          />
        </div>
        {caption ? (
          <figcaption className="mt-2 text-center text-sm text-foreground2">
            {caption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
