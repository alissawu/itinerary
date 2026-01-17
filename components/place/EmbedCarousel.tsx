'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { PlaceEmbed } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, PlayIcon, SlideshowIcon } from '@/components/ui/Icons';

interface EmbedCarouselProps {
  embeds: PlaceEmbed[];
  onAddEmbed: () => void;
}

export function EmbedCarousel({ embeds, onAddEmbed }: EmbedCarouselProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 3;

  const canScrollLeft = scrollIndex > 0;
  const canScrollRight = scrollIndex < embeds.length - visibleCount;

  const getSourceLabel = (source: PlaceEmbed['source']): string => {
    switch (source) {
      case 'tiktok': return 'TikTok';
      case 'instagram': return 'Instagram';
      case 'youtube': return 'YouTube';
      case 'reel': return 'Reel';
      default: return 'Link';
    }
  };

  return (
    <div className="flex items-center py-[10px] px-[18px] gap-[10px] border-b border-[var(--border)] last:border-b-0">
      {/* Label - 50px fixed */}
      <span className="w-[50px] flex-shrink-0 text-[10px] font-semibold uppercase text-[var(--text-muted)]">
        Embeds
      </span>

      {/* Left nav */}
      <button
        onClick={() => setScrollIndex((i) => Math.max(0, i - 1))}
        disabled={!canScrollLeft}
        className="w-6 h-6 flex items-center justify-center border border-[var(--border-dark)] bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--text)] hover:text-white hover:border-[var(--text)] disabled:opacity-30 disabled:hover:bg-[var(--surface)] disabled:hover:text-[var(--text-muted)] disabled:hover:border-[var(--border-dark)] flex-shrink-0"
      >
        <ChevronLeftIcon className="w-2.5 h-2.5" />
      </button>

      {/* Media track */}
      <div className="flex gap-[6px] flex-1 overflow-hidden">
        {embeds.slice(scrollIndex, scrollIndex + visibleCount).map((embed) => (
          <div
            key={embed.id}
            className="w-[88px] h-[56px] bg-black rounded relative flex-shrink-0 cursor-pointer overflow-hidden group"
          >
            <Image src={embed.thumbnailUrl} alt="" fill className="object-cover transition-transform group-hover:scale-105" />

            {embed.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayIcon className="w-2.5 h-2.5 ml-0.5 text-[var(--text)]" />
                </div>
              </div>
            )}

            {embed.type === 'slideshow' && (
              <div className="absolute top-[3px] right-[3px] w-[14px] h-[14px] bg-black/60 rounded-sm flex items-center justify-center">
                <SlideshowIcon className="w-2 h-2 text-white" />
              </div>
            )}

            <span className="absolute bottom-[3px] left-[3px] px-[5px] py-[2px] bg-black/75 rounded-[3px] text-[8px] font-semibold text-white">
              {getSourceLabel(embed.source)}
            </span>
          </div>
        ))}
        <button
          onClick={onAddEmbed}
          className="w-[88px] h-[56px] border border-dashed border-[var(--border-dark)] rounded flex items-center justify-center text-[var(--text-muted)] flex-shrink-0 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[rgba(59,130,246,0.05)]"
        >
          <PlusIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right nav */}
      <button
        onClick={() => setScrollIndex((i) => Math.min(embeds.length - visibleCount, i + 1))}
        disabled={!canScrollRight}
        className="w-6 h-6 flex items-center justify-center border border-[var(--border-dark)] bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--text)] hover:text-white hover:border-[var(--text)] disabled:opacity-30 disabled:hover:bg-[var(--surface)] disabled:hover:text-[var(--text-muted)] disabled:hover:border-[var(--border-dark)] flex-shrink-0"
      >
        <ChevronRightIcon className="w-2.5 h-2.5" />
      </button>
    </div>
  );
}
