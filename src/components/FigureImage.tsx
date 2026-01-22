// src/components/FigureImage.tsx
import * as React from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
};

export default function FigureImage({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
  width = 800, // Default width if not provided
  height = 450, // Default height if not provided
}: Props) {
  return (
    <figure className={`my-6 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`mx-auto rounded-lg shadow-lg ${imgClassName}`}
        style={{ width: '100%', height: 'auto' }} // Responsive behavior
      />
      {caption ? (
        <figcaption className="text-sm text-foreground2 mt-2 text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
