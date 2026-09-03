"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  {
    src: "/products/audifono-entre-manos-signia.jpeg",
    alt: "Audífono Signia discreto presentado entre las manos",
  },
  {
    src: "/products/audifono-entre-manos-lateral.jpeg",
    alt: "Vista lateral de un audífono moderno entre las manos",
  },
  {
    src: "/products/audifono-entre-manos.jpeg",
    alt: "Audífono compacto presentado entre las manos",
  },
  {
    src: "/products/audifono-entre-manos-vertical.jpeg",
    alt: "Audífono discreto suspendido visualmente entre las manos",
  },
] as const;

export function ProductPhotoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex h-full min-h-[520px] flex-col bg-[#f4f5f2] lg:min-h-[720px]">
      <div className="relative flex-1">
        {photos.map((photo, index) => {
          const isActive = index === activeIndex;
          return (
            <Image
              key={photo.src}
              src={photo.src}
              alt={isActive ? photo.alt : ""}
              fill
              className={[
                "object-contain transition-opacity duration-700",
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              ].join(" ")}
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority={index === 0}
              aria-hidden={!isActive}
            />
          );
        })}
      </div>

      <div className="border-t border-[var(--color-border)] bg-white/95 p-3 backdrop-blur sm:p-4">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {photos.map((photo, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagen ${index + 1} de ${photos.length}`}
                aria-pressed={isActive}
                className={[
                  "relative h-16 overflow-hidden rounded-xl border bg-[#f4f5f2] transition sm:h-20",
                  isActive
                    ? "border-[var(--color-brand-strong)] ring-2 ring-[var(--color-brand-strong)]/20"
                    : "border-[var(--color-border)] opacity-70 hover:opacity-100",
                ].join(" ")}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
