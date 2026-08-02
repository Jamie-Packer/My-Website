"use client";

// src/components/HeroPortrait.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Person = "george" | "john";

const MASKS: Record<Person, { src: string; href: string; label: string }> = {
  george: {
    src: "/images/home/george-box-glow.png",
    href: "/articles/george-box",
    label: "About George Box",
  },
  john: {
    src: "/images/home/john-tukey-glow.png",
    href: "/articles/john-tukey",
    label: "About John Tukey",
  },
};

/** Ignore soft fringe pixels; solid portrait/glow regions are well above this. */
const ALPHA_THRESHOLD = 48;

const IMAGE_SIZE = 1024;

/**
 * Map a pointer position in a container to image pixel coords under CSS object-cover
 * (centered), matching the default Next/Image + object-cover behaviour.
 */
function pointerToCoverCoords(
  clientX: number,
  clientY: number,
  rect: DOMRect
): { x: number; y: number } | null {
  if (rect.width <= 0 || rect.height <= 0) return null;

  const scale = Math.max(rect.width / IMAGE_SIZE, rect.height / IMAGE_SIZE);
  const displayW = IMAGE_SIZE * scale;
  const displayH = IMAGE_SIZE * scale;
  const offsetX = (rect.width - displayW) / 2;
  const offsetY = (rect.height - displayH) / 2;

  const x = (clientX - rect.left - offsetX) / scale;
  const y = (clientY - rect.top - offsetY) / scale;

  if (x < 0 || y < 0 || x >= IMAGE_SIZE || y >= IMAGE_SIZE) return null;
  return { x, y };
}

async function loadAlphaMap(src: string): Promise<Uint8ClampedArray> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    el.src = src;
  });

  const canvas = document.createElement("canvas");
  canvas.width = IMAGE_SIZE;
  canvas.height = IMAGE_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas unsupported");

  ctx.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
  return ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE).data;
}

function sampleAlpha(data: Uint8ClampedArray, x: number, y: number): number {
  const ix = Math.min(IMAGE_SIZE - 1, Math.max(0, Math.floor(x)));
  const iy = Math.min(IMAGE_SIZE - 1, Math.max(0, Math.floor(y)));
  return data[(iy * IMAGE_SIZE + ix) * 4 + 3] ?? 0;
}

const overlayClassName =
  "absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 ease-out pointer-events-none";

const HeroPortrait = () => {
  const router = useRouter();
  const frameRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<Partial<Record<Person, Uint8ClampedArray>>>({});
  const [active, setActive] = useState<Person | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      (Object.keys(MASKS) as Person[]).map(async (person) => {
        const data = await loadAlphaMap(MASKS[person].src);
        return [person, data] as const;
      })
    )
      .then((entries) => {
        if (cancelled) return;
        alphaRef.current = Object.fromEntries(entries);
        setReady(true);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const personAtPointer = (clientX: number, clientY: number): Person | null => {
    const frame = frameRef.current;
    const alphas = alphaRef.current;
    if (!frame || !alphas.george || !alphas.john) return null;

    const coords = pointerToCoverCoords(clientX, clientY, frame.getBoundingClientRect());
    if (!coords) return null;

    const george = sampleAlpha(alphas.george, coords.x, coords.y);
    const john = sampleAlpha(alphas.john, coords.x, coords.y);

    const georgeHit = george >= ALPHA_THRESHOLD;
    const johnHit = john >= ALPHA_THRESHOLD;
    if (!georgeHit && !johnHit) return null;
    if (georgeHit && !johnHit) return "george";
    if (johnHit && !georgeHit) return "john";
    return george >= john ? "george" : "john";
  };

  return (
    <div
      ref={frameRef}
      className={`relative hidden min-h-screen bg-background md:block ${
        active ? "cursor-pointer" : "cursor-default"
      }`}
      onPointerMove={(e) => {
        if (!ready) return;
        const next = personAtPointer(e.clientX, e.clientY);
        setActive((prev) => (prev === next ? prev : next));
      }}
      onPointerLeave={() => setActive(null)}
      onClick={() => {
        if (!active) return;
        router.push(MASKS[active].href);
      }}
      role="group"
      aria-label="Interactive portrait of George Box and John Tukey"
    >
      <Image
        src="/images/home/home_image.webp"
        alt="Jamie with George Box and John Tukey"
        fill
        className="object-cover object-center"
        priority
        sizes="50vw"
      />

      {/* Plain img keeps pixel alignment identical to the alpha maps we sample */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MASKS.george.src}
        alt=""
        aria-hidden
        className={`${overlayClassName} ${active === "george" ? "opacity-100" : ""}`}
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MASKS.john.src}
        alt=""
        aria-hidden
        className={`${overlayClassName} ${active === "john" ? "opacity-100" : ""}`}
        draggable={false}
      />

      {/* Keyboard / screen-reader paths (mouse uses alpha hit-testing above) */}
      <nav className="sr-only" aria-label="About the statisticians in the portrait">
        <a href={MASKS.george.href}>{MASKS.george.label}</a>
        <a href={MASKS.john.href}>{MASKS.john.label}</a>
      </nav>
    </div>
  );
};

export default HeroPortrait;
