// src/components/FigureImage.tsx
import * as React from "react";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
};

export default function FigureImage({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
}: Props) {
  return (
    <figure className={`my-6 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`mx-auto rounded-lg shadow-lg ${imgClassName}`}
      />
      {caption ? (
        <figcaption className="text-sm text-foreground2 mt-2 text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
