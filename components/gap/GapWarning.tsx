'use client';

import { formatDurationLong } from '@/lib/time-utils';
import { WarningIcon, PlusIcon } from '@/components/ui/Icons';

interface GapWarningProps {
  gapMinutes: number;
  nextPlaceName: string;
  onAddPlace: () => void;
}

export function GapWarning({ gapMinutes, nextPlaceName, onAddPlace }: GapWarningProps) {
  return (
    <div className="flex items-center gap-[8px] py-[10px] px-[14px] ml-[40px] mb-[6px] bg-[var(--warning-bg)] border-l-[3px] border-l-[var(--warning-border)] text-[11px] text-[var(--warning-text)] group">
      <WarningIcon className="w-[14px] h-[14px] flex-shrink-0" />
      <span className="flex-1">
        <strong className="font-semibold">{formatDurationLong(gapMinutes)} gap</strong>
        {' '}before {nextPlaceName}
      </span>
      <button
        onClick={onAddPlace}
        className="w-5 h-5 bg-[var(--warning-border)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#d97706] flex-shrink-0"
      >
        <PlusIcon className="w-3 h-3 text-white" />
      </button>
    </div>
  );
}
