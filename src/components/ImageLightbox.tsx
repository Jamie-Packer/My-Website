"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const MAGNIFY = 1.75;
const FIT_MAX_WIDTH_VW = 0.96;
const FIT_MAX_HEIGHT_VH = 0.85;
const FIT_MAX_HEIGHT_WITH_CAPTION_VH = 0.75;

type Props = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  unoptimized?: boolean;
  onClose: () => void;
};

function readViewport() {
  if (typeof window === "undefined") return { w: 1200, h: 800 };
  return { w: window.innerWidth, h: window.innerHeight };
}

/** Scale declared pixel size to fit a box. Format-agnostic (SVG, WebP, PNG). */
function containSize(naturalW: number, naturalH: number, maxW: number, maxH: number) {
  if (naturalW <= 0 || naturalH <= 0 || maxW <= 0 || maxH <= 0) {
    return { w: maxW, h: maxH };
  }
  const scale = Math.min(maxW / naturalW, maxH / naturalH);
  return { w: naturalW * scale, h: naturalH * scale };
}

function displaySize(
  naturalW: number,
  naturalH: number,
  viewport: { w: number; h: number },
  magnified: boolean,
  hasCaption: boolean,
) {
  const fit = containSize(
    naturalW,
    naturalH,
    viewport.w * FIT_MAX_WIDTH_VW,
    viewport.h * (hasCaption ? FIT_MAX_HEIGHT_WITH_CAPTION_VH : FIT_MAX_HEIGHT_VH),
  );
  const factor = magnified ? MAGNIFY : 1;
  return { w: fit.w * factor, h: fit.h * factor };
}

export default function ImageLightbox({
  src,
  alt,
  caption,
  width,
  height,
  unoptimized = false,
  onClose,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();
  const [visible, setVisible] = useState(false);
  const [magnified, setMagnified] = useState(false);
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    const onResize = () => setViewport(readViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    if (reduceMotion) {
      setVisible(true);
    } else {
      frame = requestAnimationFrame(() => setVisible(true));
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const display = displaySize(width, height, viewport, magnified, Boolean(caption));

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={caption ? labelId : undefined}
      aria-label={caption ? undefined : alt}
      className={`fixed inset-0 z-[100] overflow-auto bg-background/80 backdrop-blur-sm transition-opacity duration-150 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed top-4 right-4 z-[101] flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-background2 text-foreground transition-colors duration-200 hover:bg-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <div className="flex min-h-full items-center justify-center p-4 pt-24">
        <div
          className="flex flex-col items-center"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setMagnified((isMagnified) => !isMagnified)}
            aria-label={magnified ? "Zoom out" : "Zoom in further"}
            className={`appearance-none border-0 bg-transparent p-0 ${
              magnified ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized={unoptimized}
              sizes={magnified ? `${Math.round(FIT_MAX_WIDTH_VW * MAGNIFY * 100)}vw` : "96vw"}
              className="rounded-lg object-contain shadow-2xl transition-[width,height] duration-200 motion-reduce:transition-none"
              style={{
                width: display.w,
                height: display.h,
                maxWidth: "none",
                maxHeight: "none",
              }}
            />
          </button>
          {caption ? (
            <p
              id={labelId}
              className="mt-3 max-w-3xl text-center text-sm text-foreground2"
            >
              {caption}
            </p>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
