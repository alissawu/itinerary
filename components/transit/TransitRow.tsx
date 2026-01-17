'use client';

import { useState } from 'react';
import type { TransitSegment } from '@/types';
import { WalkIcon, CarIcon, TrainIcon } from '@/components/ui/Icons';

interface TransitRowProps {
  transit: TransitSegment;
  onUpdate: (updates: Partial<TransitSegment>) => void;
}

type Mode = TransitSegment['mode'];

const MODES: { mode: Mode; icon: React.ComponentType<{ className?: string }>; label: string; speedFactor: number }[] = [
  { mode: 'walk', icon: WalkIcon, label: 'Walk', speedFactor: 1 },
  { mode: 'drive', icon: CarIcon, label: 'Drive', speedFactor: 0.3 },
  { mode: 'transit', icon: TrainIcon, label: 'Transit', speedFactor: 0.5 },
];

export function TransitRow({ transit, onUpdate }: TransitRowProps) {
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [localDuration, setLocalDuration] = useState(transit.duration.toString());

  const handleDurationSubmit = () => {
    const numVal = parseInt(localDuration, 10);
    if (!isNaN(numVal) && numVal > 0) {
      onUpdate({ duration: numVal });
    } else {
      setLocalDuration(transit.duration.toString());
    }
    setIsEditingDuration(false);
  };

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  // Get the base walk time (stored duration is for the selected mode)
  const selectedMode = MODES.find(m => m.mode === transit.mode);
  const baseWalkTime = selectedMode ? transit.duration / selectedMode.speedFactor : transit.duration;

  const getEstimatedTime = (speedFactor: number) => {
    return Math.round(baseWalkTime * speedFactor);
  };

  return (
    <div className="flex items-center gap-[8px] py-[6px] pl-[40px] mb-[6px]">
      {/* Mode selector pills */}
      <div className="flex items-center gap-[2px]">
        {MODES.map(({ mode, icon: Icon, label, speedFactor }) => {
          const isSelected = transit.mode === mode;
          const estimatedTime = getEstimatedTime(speedFactor);

          return (
            <button
              key={mode}
              onClick={() => {
                const newDuration = getEstimatedTime(speedFactor);
                onUpdate({ mode, duration: newDuration });
              }}
              title={label}
              className={`flex items-center gap-[5px] px-[10px] py-[5px] text-[11px] transition-all ${
                isSelected
                  ? 'bg-[var(--text)] text-[var(--surface)] rounded-full'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              <Icon className="w-[12px] h-[12px]" />
              <span className={isSelected ? 'font-medium' : ''}>
                {isSelected && isEditingDuration ? (
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
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                    className="w-[28px] bg-transparent border-b border-[var(--surface)] text-center text-[11px] text-[var(--surface)] outline-none"
                  />
                ) : (
                  <span
                    onClick={(e) => {
                      if (isSelected) {
                        e.stopPropagation();
                        setLocalDuration(transit.duration.toString());
                        setIsEditingDuration(true);
                      }
                    }}
                    className={isSelected ? 'cursor-pointer hover:underline' : ''}
                  >
                    {formatDuration(estimatedTime)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Route summary */}
      {transit.routeSummary && (
        <span className="text-[11px] text-[var(--text-muted)]">
          via {transit.routeSummary}
        </span>
      )}
    </div>
  );
}
