'use client';

import { formatDuration } from '@/lib/time-utils';

interface DurationInputProps {
  value: number;
  onChange: (minutes: number) => void;
}

const DURATION_OPTIONS = [
  { value: 30, label: '30m' },
  { value: 45, label: '45m' },
  { value: 60, label: '1h' },
  { value: 90, label: '1.5h' },
  { value: 120, label: '2h' },
  { value: 150, label: '2.5h' },
  { value: 180, label: '3h' },
  { value: 240, label: '4h' },
];

export function DurationInput({ value, onChange }: DurationInputProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className="font-mono text-[10px] py-[2px] px-[4px] border border-[var(--border)] bg-[var(--surface)] cursor-pointer appearance-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a8a29e' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 2px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '14px',
        paddingRight: '18px'
      }}
    >
      {DURATION_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
      {/* Show current value if not in options */}
      {!DURATION_OPTIONS.some(o => o.value === value) && (
        <option value={value}>{formatDuration(value)}</option>
      )}
    </select>
  );
}
