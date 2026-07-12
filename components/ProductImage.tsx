"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export function ProductImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-tes-bg text-tes-green/40 ${className ?? ""}`}
      >
        <Icon name="tools" size={40} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={imgClassName ?? "max-w-full max-h-full object-contain"}
    />
  );
}
