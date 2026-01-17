'use client';

import { useState } from 'react';
import { PlusIcon, SearchIcon, MapPinIcon, LinkIcon } from '@/components/ui/Icons';

interface AddPlaceButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export function AddPlaceButton({ isVisible, onClick }: AddPlaceButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button
        onClick={onClick}
        className={`w-[22px] h-[22px] bg-[var(--surface)] border border-[var(--border-dark)] rounded-full flex items-center justify-center transition-all ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.8]'
        } hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:scale-110 group`}
      >
        <PlusIcon className="w-3 h-3 text-[var(--text-muted)] group-hover:text-white" />
      </button>

      {showMenu && isVisible && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-[var(--surface)] border border-[var(--border-dark)] rounded-lg shadow-lg min-w-[180px] py-1 z-50">
          <button
            onClick={() => { onClick(); setShowMenu(false); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--text)] hover:bg-[var(--active-bg)]"
          >
            <PlusIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Add custom place
          </button>
          <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--text)] hover:bg-[var(--active-bg)]">
            <SearchIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Browse places
          </button>
          <div className="h-px bg-[var(--border)] my-1" />
          <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--text)] hover:bg-[var(--active-bg)]">
            <MapPinIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Import from Google Maps
          </button>
          <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--text)] hover:bg-[var(--active-bg)]">
            <LinkIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Paste link
          </button>
        </div>
      )}
    </div>
  );
}
