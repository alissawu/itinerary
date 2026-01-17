'use client';

import { useState, useEffect } from 'react';

interface DurationInputProps {
  value: number; // minutes
  onChange: (minutes: number) => void;
}

function formatDurationDisplay(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function parseDuration(input: string): number | null {
  const trimmed = input.trim().toLowerCase();

  // Try "1h 30m" or "1h30m" format
  const hm = trimmed.match(/^(\d+)\s*h\s*(\d+)\s*m?$/);
  if (hm) {
    return parseInt(hm[1], 10) * 60 + parseInt(hm[2], 10);
  }

  // Try "1.5h" format
  const decimalH = trimmed.match(/^(\d+\.?\d*)\s*h$/);
  if (decimalH) {
    return Math.round(parseFloat(decimalH[1]) * 60);
  }

  // Try "90m" format
  const mOnly = trimmed.match(/^(\d+)\s*m$/);
  if (mOnly) {
    return parseInt(mOnly[1], 10);
  }

  // Try just "1h" format
  const hOnly = trimmed.match(/^(\d+)\s*h$/);
  if (hOnly) {
    return parseInt(hOnly[1], 10) * 60;
  }

  // Try plain number (assume minutes)
  const plain = trimmed.match(/^(\d+)$/);
  if (plain) {
    return parseInt(plain[1], 10);
  }

  return null;
}

export function DurationInput({ value, onChange }: DurationInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(formatDurationDisplay(value));

  useEffect(() => {
    if (!isEditing) {
      setInputValue(formatDurationDisplay(value));
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    const parsed = parseDuration(inputValue);
    if (parsed !== null && parsed > 0) {
      onChange(parsed);
    } else {
      setInputValue(formatDurationDisplay(value));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setInputValue(formatDurationDisplay(value));
      setIsEditing(false);
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="font-mono text-[10px] py-[2px] px-[4px] border border-[var(--border)] bg-[var(--surface)] w-[50px] text-[var(--text-muted)]"
    />
  );
}
