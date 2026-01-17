'use client';

import { useState } from 'react';
import type { TransitSegment } from '@/types';

interface TransitRowProps {
  transit: TransitSegment;
  onUpdate: (updates: Partial<TransitSegment>) => void;
}

const TRANSIT_MODES: TransitSegment['mode'][] = ['walk', 'drive', 'transit', 'custom'];

export function TransitRow({ transit, onUpdate }: TransitRowProps) {
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [localDuration, setLocalDuration] = useState(transit.duration.toString());

  const handleModeClick = () => {
    const currentIndex = TRANSIT_MODES.indexOf(transit.mode);
    const nextIndex = (currentIndex + 1) % TRANSIT_MODES.length;
    onUpdate({ mode: TRANSIT_MODES[nextIndex] });
  };

  const handleDurationSubmit = () => {
    const numVal = parseInt(localDuration, 10);
    if (!isNaN(numVal) && numVal > 0) {
      onUpdate({ duration: numVal });
    } else {
      setLocalDuration(transit.duration.toString());
    }
    setIsEditingDuration(false);
  };

  const getModeLabel = (mode: TransitSegment['mode']): string => {
    switch (mode) {
      case 'walk': return 'WALK';
      case 'drive': return 'DRIVE';
      case 'transit': return 'TRANSIT';
      case 'custom': return 'CUSTOM';
    }
  };

  return (
    <div className="flex items-center gap-[12px] py-[4px] pl-[40px] mb-[6px]">
      <button
        onClick={handleModeClick}
        className="px-[10px] py-[5px] bg-[var(--text)] text-[var(--surface)] text-[10px] font-medium tracking-[0.05em] uppercase border-none font-mono flex-shrink-0"
      >
        {getModeLabel(transit.mode)}
      </button>

      <span
        onClick={() => setIsEditingDuration(true)}
        className="text-[12px] text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-secondary)] flex-shrink-0"
      >
        {isEditingDuration ? (
          <input
            type="number"
            value={localDuration}
            onChange={(e) => setLocalDuration(e.target.value)}
            onBlur={handleDurationSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDurationSubmit();
              if (e.key === 'Escape') {
                setLocalDuration(transit.duration.toString());
                setIsEditingDuration(false);
              }
            }}
            autoFocus
            className="w-12 px-1 py-0.5 border border-[var(--border)] bg-[var(--surface)] text-center font-mono text-[12px]"
          />
        ) : (
          <>
            {transit.duration} min
            {transit.routeSummary && <span className="ml-1">{transit.routeSummary}</span>}
          </>
        )}
      </span>
    </div>
  );
}
