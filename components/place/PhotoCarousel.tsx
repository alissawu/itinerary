'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@/components/ui/Icons';

interface PhotoCarouselProps {
  photos: string[];
  onAddPhoto: () => void;
}

export function PhotoCarousel({ photos, onAddPhoto }: PhotoCarouselProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 4;

  const canScrollLeft = scrollIndex > 0;
  const canScrollRight = scrollIndex < photos.length - visibleCount;

  return (
    <div className="flex items-center py-[10px] px-[18px] gap-[10px] border-b border-[var(--border)]">
      {/* Label - 50px fixed */}
      <span className="w-[50px] flex-shrink-0 text-[10px] font-semibold uppercase text-[var(--text-muted)]">
        Photos
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
        {photos.slice(scrollIndex, scrollIndex + visibleCount).map((photo, index) => (
          <Image
            key={`${photo}-${index}`}
            src={photo}
            alt=""
            width={56}
            height={56}
            className="w-[56px] h-[56px] object-cover rounded flex-shrink-0"
          />
        ))}
        <button
          onClick={onAddPhoto}
          className="w-[56px] h-[56px] border border-dashed border-[var(--border-dark)] rounded flex items-center justify-center text-[var(--text-muted)] flex-shrink-0 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[rgba(59,130,246,0.05)]"
        >
          <PlusIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right nav */}
      <button
        onClick={() => setScrollIndex((i) => Math.min(photos.length - visibleCount, i + 1))}
        disabled={!canScrollRight}
        className="w-6 h-6 flex items-center justify-center border border-[var(--border-dark)] bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--text)] hover:text-white hover:border-[var(--text)] disabled:opacity-30 disabled:hover:bg-[var(--surface)] disabled:hover:text-[var(--text-muted)] disabled:hover:border-[var(--border-dark)] flex-shrink-0"
      >
        <ChevronRightIcon className="w-2.5 h-2.5" />
      </button>
    </div>
  );
}
