"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  span: string; // Tailwind col-span class
  aspectClass: string; // aspect ratio class
}

interface GalleryGridProps {
  items: GalleryItem[];
  dict: {
    allPhotos: string;
    community: string;
    exploreMore: string;
    allLoaded: string;
    close: string;
    prevPhoto: string;
    nextPhoto: string;
  };
  programsDict: {
    title: string;
    environment: string;
  };
}

export default function GalleryGrid({ items, dict, programsDict }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const focusTrapRef = useFocusTrap(lightboxIndex !== null);

  const categories = [
    { key: "all", label: dict.allPhotos },
    { key: "community", label: dict.community },
    { key: "programs", label: programsDict.title },
    { key: "environment", label: programsDict.environment },
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleFilterChange = (key: string) => {
    setActiveFilter(key);
    setVisibleCount(5);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % visibleItems.length);
    }
  }, [lightboxIndex, visibleItems.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + visibleItems.length) % visibleItems.length);
    }
  }, [lightboxIndex, visibleItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleFilterChange(cat.key)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeFilter === cat.key
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className={`${item.span} group relative overflow-hidden rounded-xl bg-surface-container-low ${item.aspectClass} cursor-pointer`}
            onClick={() => openLightbox(index)}
          >
            <Image
              alt={item.alt}
              src={item.src}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
              <span className="text-secondary-fixed-dim text-xs font-bold uppercase tracking-widest mb-2">
                {categories.find((c) => c.key === item.category)?.label || item.category}
              </span>
              <h3 className="text-white text-lg md:text-2xl font-headline font-bold">{item.title}</h3>
              <p className="text-white/80 text-xs md:text-sm mt-1 md:mt-2 font-body">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More / All Loaded */}
      <div className="mt-20 text-center">
        {hasMore ? (
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredItems.length))}
            className="group relative inline-flex items-center gap-2 text-primary font-headline font-bold text-lg hover:text-secondary transition-colors"
          >
            {dict.exploreMore}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        ) : filteredItems.length > 0 ? (
          <p className="text-zinc-400 text-sm font-body flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            {dict.allLoaded}
          </p>
        ) : null}
        <div className="mt-4 flex justify-center gap-1">
          <span className="w-1 h-1 rounded-full bg-primary opacity-20"></span>
          <span className="w-1 h-1 rounded-full bg-primary opacity-20"></span>
          <span className="w-1 h-1 rounded-full bg-primary opacity-20"></span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && visibleItems[lightboxIndex] && (
        <div ref={focusTrapRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" role="dialog" aria-modal="true" aria-label="Image gallery lightbox">
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label={dict.close}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Prev */}
          <button
            onClick={goPrev}
            className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label={dict.prevPhoto}
          >
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl max-h-[85vh] mx-16 aspect-[4/3]">
            <Image
              src={visibleItems[lightboxIndex].src}
              alt={visibleItems[lightboxIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label={dict.nextPhoto}
          >
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>

          {/* Caption */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white max-w-lg">
            <h3 className="text-xl font-bold font-headline mb-1">{visibleItems[lightboxIndex].title}</h3>
            <p className="text-white/70 text-sm">{visibleItems[lightboxIndex].description}</p>
            <p className="text-white/40 text-xs mt-2">{lightboxIndex + 1} / {visibleItems.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
