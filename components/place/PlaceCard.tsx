'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Place } from '@/types';
import { formatTimeRange, formatTime12h } from '@/lib/time-utils';
import { DurationInput } from '@/components/ui/DurationInput';
import { PlaceContextMenu } from './PlaceContextMenu';
import { AddPlaceButton } from './AddPlaceButton';
import { PhotoCarousel } from './PhotoCarousel';
import { EmbedCarousel } from './EmbedCarousel';
import { DragIcon, AnchorIcon, ClockIcon } from '@/components/ui/Icons';

interface PlaceCardProps {
  place: Place;
  startTime: string;
  onUpdate: (updates: Partial<Place>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onAddAfter: () => void;
}

export function PlaceCard({
  place,
  startTime,
  onUpdate,
  onDelete,
  onDuplicate,
  onAddAfter,
}: PlaceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: place.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const effectiveStartTime = place.anchorTime || startTime;
  const timeDisplay = formatTimeRange(effectiveStartTime, place.duration);
  const [startTimeStr, endTimeStr] = timeDisplay.split('–');
  const isAnchored = !!place.anchorTime;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative mb-[6px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        className={`bg-[var(--surface)] border border-[var(--border)] transition-all hover:border-[var(--border-dark)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative ${
          isAnchored ? 'border-l-[3px] border-l-[var(--anchor)]' : ''
        }`}
      >
        {/* Main content row - grid: 28px drag, 95px time, 1fr content */}
        <div className="grid grid-cols-[28px_95px_1fr]">
          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="flex items-center justify-center bg-[var(--active-bg)] border-r border-[var(--border)] cursor-grab text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--border)]"
          >
            <DragIcon className="w-3 h-3" />
          </div>

          {/* Time column */}
          <div className="py-[14px] px-[12px] bg-[var(--active-bg)] border-r border-[var(--border)]">
            <div className="font-mono text-[11px] font-medium text-[var(--text)] mb-1">
              {startTimeStr}–{endTimeStr}
            </div>
            <div className="mb-[6px]">
              <DurationInput
                value={place.duration}
                onChange={(minutes) => onUpdate({ duration: minutes })}
              />
            </div>
            <button
              onClick={() => {
                if (isAnchored) {
                  onUpdate({ anchorTime: null });
                } else {
                  onUpdate({ anchorTime: startTime });
                }
              }}
              className={`flex items-center gap-1 text-[9px] cursor-pointer ${
                isAnchored
                  ? 'text-[var(--anchor)] font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              <AnchorIcon className="w-2.5 h-2.5" />
              {isAnchored ? formatTime12h(place.anchorTime!) : 'Anchor'}
            </button>
          </div>

          {/* Content column */}
          <div className="py-[14px] px-[18px]">
            <h3 className="text-[14px] font-semibold text-[var(--text)] mb-[3px]">
              {place.name}
            </h3>
            <p className="text-[11px] text-[var(--text-muted)] mb-2">
              {place.address}
            </p>

            {place.hours && (
              <div className="inline-flex items-center gap-1 text-[10px] py-[3px] px-[6px] bg-[#ecfdf5] text-[#047857] mb-2">
                <ClockIcon className="w-2.5 h-2.5" />
                Opens · Closes ✓
              </div>
            )}

            {place.notes && (
              <p className="text-[12px] leading-[1.55] text-[var(--text-secondary)]">
                {place.notes}
              </p>
            )}
          </div>
        </div>

        {/* Media sections */}
        <div className="border-t border-[var(--border)]">
          <PhotoCarousel photos={place.photos} onAddPhoto={() => {}} />
          <EmbedCarousel embeds={place.embeds} onAddEmbed={() => {}} />
        </div>

        {/* Context menu */}
        <PlaceContextMenu
          isVisible={isHovered}
          onEdit={() => {}}
          onDuplicate={onDuplicate}
          onMoveToDay={() => {}}
          onDelete={onDelete}
        />
      </article>

      {/* Add button */}
      <AddPlaceButton isVisible={isHovered} onClick={onAddAfter} />
    </div>
  );
}
