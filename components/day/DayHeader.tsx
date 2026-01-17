'use client';

import { useState, useEffect } from 'react';
import { useTripStore } from '@/store/tripStore';

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function DayHeader() {
  const { currentTripId, currentDayId, trips, updateDay } = useTripStore();

  const currentTrip = trips.find((t) => t.id === currentTripId);
  const currentDay = currentTrip?.days.find((d) => d.id === currentDayId);

  const [startTime, setStartTime] = useState(currentDay?.startTime || '10:00');

  useEffect(() => {
    if (currentDay) setStartTime(currentDay.startTime);
  }, [currentDay]);

  if (!currentDay) return null;

  const handleStartTimeBlur = () => {
    if (currentTripId && currentDayId) {
      const match = startTime.match(/^(\d{1,2}):(\d{2})$/);
      if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          updateDay(currentTripId, currentDayId, { startTime: formattedTime });
          setStartTime(formattedTime);
          return;
        }
      }
      setStartTime(currentDay.startTime);
    }
  };

  const formatTimeDisplay = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <header className="flex justify-between items-center px-[28px] py-[18px] bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="text-[13px] text-[var(--text-secondary)]">
        <span className="font-semibold text-[var(--text)]">Day {currentDay.dayNumber}</span>
        <span className="mx-2">·</span>
        {formatFullDate(currentDay.date)}
      </div>
      <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
        <span>Day starts at</span>
        <input
          type="text"
          value={formatTimeDisplay(startTime)}
          onChange={(e) => {
            const val = e.target.value;
            const match = val.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
            if (match) {
              let hours = parseInt(match[1], 10);
              const minutes = parseInt(match[2], 10);
              const period = match[3]?.toUpperCase();
              if (period === 'PM' && hours !== 12) hours += 12;
              if (period === 'AM' && hours === 12) hours = 0;
              if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                setStartTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
              }
            }
          }}
          onBlur={handleStartTimeBlur}
          className="font-mono text-[12px] px-2 py-1 border border-[var(--border)] bg-[var(--surface)] w-[75px] text-[var(--text)]"
        />
      </div>
    </header>
  );
}
