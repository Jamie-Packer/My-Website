"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  /** Skip Next.js optimization — required for animated GIF/WebP so frames are preserved */
  unoptimized?: boolean;
  /** Click-to-enlarge overlay. Default on; set false for portraits or low-res images. */
  lightbox?: boolean;
};

function isSvgSrc(src: string) {
  return src.split("?")[0].toLowerCase().endsWith(".svg");
}

export default function FigureImage({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
  width = 800,
  height = 450,
  unoptimized = false,
  lightbox = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const skipOptimize = unoptimized || isSvgSrc(src);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized={skipOptimize}
      className={`mx-auto rounded-lg shadow-lg ${imgClassName}`}
      style={{ width: "100%", height: "auto" }}
    />
  );

  return (
    <figure className={`my-6 ${className}`}>
      {lightbox ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge image: ${alt}`}
          className="mx-auto block w-full cursor-zoom-in appearance-none rounded-lg border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
        >
          {image}
        </button>
      ) : (
        image
      )}
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-foreground2">
          {caption}
        </figcaption>
      ) : null}
      {lightbox && open ? (
        <ImageLightbox
          src={src}
          alt={alt}
          caption={caption}
          width={width}
          height={height}
          unoptimized={skipOptimize}
          onClose={close}
        />
      ) : null}
    </figure>
  );
}
