"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

interface LogEntry {
  week: string;
  dateRange: string;
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  extraPhotos?: number;
  tags: { label: string; color: string }[];
  isLatest?: boolean;
}

interface LogbookTimelineProps {
  entries: LogEntry[];
  dict: {
    loadMore: string;
    search: string;
    noResults: string;
    allLoaded: string;
    photos: string;
  };
}

export default function LogbookTimeline({ entries, dict }: LogbookTimelineProps) {
  const [visibleCount, setVisibleCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return entries;
    const q = searchQuery.toLowerCase();
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.label.toLowerCase().includes(q))
    );
  }, [entries, searchQuery]);

  const visibleEntries = filteredEntries.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEntries.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, filteredEntries.length));
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div />
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-highest border-none focus:ring-2 focus:ring-primary rounded-xl text-sm transition-all outline-none"
              placeholder={dict.search}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(2);
              }}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <section className="relative">
        {/* Central Line */}
        <div className="absolute left-5 md:left-6 top-0 bottom-0 w-[2px] bg-surface-container-highest"></div>

        {visibleEntries.length === 0 && (
          <div className="pl-12 md:pl-20 py-12 text-center">
            <span className="material-symbols-outlined text-5xl text-zinc-300 mb-4">search_off</span>
            <p className="text-zinc-500 font-body text-lg">{dict.noResults}</p>
          </div>
        )}

        {visibleEntries.map((entry, index) => (
          <div
            key={index}
            className="relative pl-12 md:pl-20 mb-20 group animate-[fadeInUp_400ms_ease-out]"
          >
            {/* Timeline Dot */}
            <div
              className={`absolute left-[14px] md:left-[18px] top-1 w-4 h-4 rounded-full border-4 border-surface ring-4 ring-surface-container transition-all group-hover:scale-125 ${
                entry.isLatest ? "bg-secondary" : "bg-zinc-300 group-hover:bg-secondary"
              }`}
            ></div>

            <div
              className={`flex flex-col md:grid md:grid-cols-12 gap-8 ${
                !entry.isLatest ? "opacity-80 group-hover:opacity-100" : ""
              } transition-opacity`}
            >
              <div className="md:col-span-3">
                <span
                  className={`font-bold font-headline text-sm tracking-widest uppercase block mb-1 ${
                    entry.isLatest ? "text-secondary" : "text-zinc-500"
                  }`}
                >
                  {entry.week}
                </span>
                <time className="text-zinc-400 text-xs font-medium">{entry.dateRange}</time>
              </div>
              <div className="md:col-span-9">
                <div
                  className={`bg-surface-container-lowest p-8 rounded-xl transition-all hover:bg-white shadow-sm ${
                    entry.isLatest
                      ? "border-l-4 border-secondary/20"
                      : "border-l-4 border-zinc-100 group-hover:border-secondary/20"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-primary mb-3 font-headline">{entry.title}</h3>
                  <p className="text-zinc-600 mb-6 leading-relaxed font-body">{entry.description}</p>

                  {/* Photos */}
                  {entry.images.length > 0 && (
                    <div className="flex flex-wrap gap-4 mb-6">
                      {entry.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="relative w-24 h-24 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
                        >
                          <Image alt={img.alt} src={img.src} fill className="object-cover" />
                        </div>
                      ))}
                      {entry.extraPhotos && (
                        <div className="w-24 h-24 bg-surface-container-high rounded-lg flex items-center justify-center text-zinc-400 text-xs font-bold">
                          +{entry.extraPhotos} {dict.photos}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex items-center gap-4">
                    {entry.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`px-3 py-1 ${tag.color} rounded-full text-[10px] font-bold tracking-wider uppercase`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Load More / All Loaded */}
      <div className="flex justify-center mt-12">
        {hasMore ? (
          <button
            onClick={loadMore}
            className="bg-secondary hover:bg-[#374825] text-white px-10 py-4 rounded-full font-bold text-sm tracking-tight flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-secondary/20"
          >
            {dict.loadMore}
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        ) : filteredEntries.length > 0 ? (
          <p className="text-zinc-400 text-sm font-body flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            {dict.allLoaded}
          </p>
        ) : null}
      </div>
    </>
  );
}
