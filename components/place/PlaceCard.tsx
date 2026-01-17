'use client';

import { useState, useEffect, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Place } from '@/types';
import { formatTime12h, addMinutes } from '@/lib/time-utils';
import { PlaceContextMenu } from './PlaceContextMenu';
import { AddPlaceButton } from './AddPlaceButton';
import { PhotoCarousel } from './PhotoCarousel';
import { EmbedCarousel } from './EmbedCarousel';
import { DragIcon, AnchorIcon, ClockIcon } from '@/components/ui/Icons';

// Generate time slots in 15-minute increments
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function formatTimeDisplay(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

function TimeDropdown({
  slots,
  currentValue,
  onSelect
}: {
  slots: string[];
  currentValue: string;
  onSelect: (time: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to current value when dropdown opens
    if (selectedRef.current && listRef.current) {
      const container = listRef.current;
      const selected = selectedRef.current;
      container.scrollTop = selected.offsetTop - container.clientHeight / 2 + selected.clientHeight / 2;
    }
  }, []);

  return (
    <div
      ref={listRef}
      className="absolute top-full left-0 mt-1 bg-[var(--surface)] border border-[var(--border)] shadow-lg z-50 max-h-[200px] overflow-y-auto w-[85px] rounded"
    >
      {slots.map((slot) => {
        const isSelected = slot === currentValue;
        return (
          <div
            key={slot}
            ref={isSelected ? selectedRef : null}
            onClick={() => onSelect(slot)}
            className={`px-2 py-1.5 text-[11px] font-mono cursor-pointer hover:bg-[var(--active-bg)] ${
              isSelected ? 'bg-[var(--accent)] text-white' : ''
            }`}
          >
            {formatTimeDisplay(slot)}
          </div>
        );
      })}
    </div>
  );
}

interface PlaceCardProps {
  place: Place;
  startTime: string;
  onUpdate: (updates: Partial<Place>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onAddAfter: () => void;
}

// Calculate duration in minutes between two HH:MM times
function calculateDuration(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const startMins = sh * 60 + sm;
  const endMins = eh * 60 + em;
  return endMins >= startMins ? endMins - startMins : (24 * 60 - startMins) + endMins;
}

function formatDurationDisplay(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
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
  const [editingField, setEditingField] = useState<'start' | 'end' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEditingField(null);
      }
    };
    if (editingField) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [editingField]);

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
  const endTime = addMinutes(effectiveStartTime, place.duration);
  const isAnchored = !!place.anchorTime;

  const handleTimeSelect = (newTime: string) => {
    if (editingField === 'start') {
      const newDuration = calculateDuration(newTime, endTime);
      onUpdate({ anchorTime: newTime, duration: newDuration > 0 ? newDuration : place.duration });
    } else if (editingField === 'end') {
      const newDuration = calculateDuration(effectiveStartTime, newTime);
      if (newDuration > 0) {
        onUpdate({ duration: newDuration });
      }
    }
    setEditingField(null);
  };

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
        {/* Main content row - grid: 28px drag, 105px time, 1fr content */}
        <div className="grid grid-cols-[28px_105px_1fr]">
          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="flex items-center justify-center bg-[var(--active-bg)] border-r border-[var(--border)] cursor-grab text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--border)]"
          >
            <DragIcon className="w-3 h-3" />
          </div>

          {/* Time column */}
          <div className="py-[14px] px-[12px] bg-[var(--active-bg)] border-r border-[var(--border)]" ref={dropdownRef}>
            <div className="font-mono text-[11px] font-medium text-[var(--text)] mb-1 flex items-center">
              <div className="relative">
                <span
                  onClick={() => setEditingField(editingField === 'start' ? null : 'start')}
                  className="cursor-pointer hover:text-[var(--accent)]"
                >
                  {effectiveStartTime}
                </span>
                {editingField === 'start' && (
                  <TimeDropdown
                    slots={TIME_SLOTS}
                    currentValue={effectiveStartTime}
                    onSelect={handleTimeSelect}
                  />
                )}
              </div>
              <span className="mx-[2px]">–</span>
              <div className="relative">
                <span
                  onClick={() => setEditingField(editingField === 'end' ? null : 'end')}
                  className="cursor-pointer hover:text-[var(--accent)]"
                >
                  {endTime}
                </span>
                {editingField === 'end' && (
                  <TimeDropdown
                    slots={TIME_SLOTS}
                    currentValue={endTime}
                    onSelect={handleTimeSelect}
                  />
                )}
              </div>
            </div>
            <div className="font-mono text-[10px] text-[var(--text-muted)] mb-[6px]">
              {formatDurationDisplay(place.duration)}
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
