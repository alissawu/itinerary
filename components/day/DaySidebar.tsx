'use client';

import { useTripStore } from '@/store/tripStore';
import type { ViewMode } from '@/types';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} – ${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
}

export function DaySidebar() {
  const { currentTripId, currentDayId, viewMode, trips, setCurrentDay, setViewMode } = useTripStore();

  const currentTrip = trips.find((t) => t.id === currentTripId);

  if (!currentTrip) {
    return (
      <aside className="w-[200px] bg-[var(--surface)] border-r border-[var(--border)] flex flex-col">
        <div className="p-6">
          <p className="text-[var(--text-muted)] text-sm">No trip selected</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[200px] bg-[var(--surface)] border-r border-[var(--border)] flex flex-col">
      {/* Trip header */}
      <div className="px-[18px] py-[24px] border-b border-[var(--border)]">
        <h1 className="text-[14px] font-semibold text-[var(--text)] mb-[4px]">
          {currentTrip.title}
        </h1>
        <p className="text-[12px] text-[var(--text-muted)]">
          {formatDateRange(currentTrip.startDate, currentTrip.endDate)}
        </p>
      </div>

      {/* Day navigation */}
      <nav className="flex-1 py-[12px]">
        {currentTrip.days.map((day) => {
          const isActive = day.id === currentDayId;
          return (
            <button
              key={day.id}
              onClick={() => setCurrentDay(day.id)}
              className={`w-full px-[18px] py-[12px] text-left transition-colors ${
                isActive ? 'bg-[var(--active-bg)]' : 'hover:bg-[var(--active-bg)]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                  Day {day.dayNumber}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  {day.places.length}
                </span>
              </div>
              <div className={`text-[12px] mt-[3px] ${isActive ? 'text-[var(--text)] font-medium' : 'text-[var(--text-secondary)]'}`}>
                {formatDate(day.date)}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mode switcher */}
      <div className="p-[14px] border-t border-[var(--border)]">
        <div className="flex border border-[var(--border)]">
          {(['detail', 'compact', 'map'] as ViewMode[]).map((mode, index) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 py-[9px] px-[6px] text-[11px] font-medium capitalize transition-colors ${
                viewMode === mode
                  ? 'bg-[var(--text)] text-[var(--surface)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--active-bg)]'
              } ${index < 2 ? 'border-r border-[var(--border)]' : ''}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
