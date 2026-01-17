export function DragIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="currentColor">
      <circle cx="4" cy="2" r="1" />
      <circle cx="8" cy="2" r="1" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="8" cy="6" r="1" />
      <circle cx="4" cy="10" r="1" />
      <circle cx="8" cy="10" r="1" />
    </svg>
  );
}

export function AnchorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="3" r="2" />
      <line x1="6" y1="5" x2="6" y2="11" />
      <path d="M3 8 L6 11 L9 8" />
    </svg>
  );
}

export function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="5" />
      <polyline points="6,3 6,6 8,7" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="6" y1="2" x2="6" y2="10" />
      <line x1="2" y1="6" x2="10" y2="6" />
    </svg>
  );
}

export function MenuDotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="3" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="8" cy="13" r="1.5" />
    </svg>
  );
}

export function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 2.5l2.5 2.5M3 13l-.5 2 2-.5L12.5 6.5 10 4 3 13z" />
    </svg>
  );
}

export function DuplicateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="5" width="8" height="8" rx="1" />
      <path d="M5 11H4a1 1 0 01-1-1V4a1 1 0 011-1h6a1 1 0 011 1v1" />
    </svg>
  );
}

export function MoveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 5h10M6 5V3.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V5M12 5v8.5a1 1 0 01-1 1H5a1 1 0 01-1-1V5" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="7,2 3,5 7,8" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="3,2 7,5 3,8" />
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor">
      <polygon points="2,1 9,5 2,9" />
    </svg>
  );
}

export function SlideshowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="2" width="7" height="8" rx="1" />
      <rect x="4" y="2" width="7" height="8" rx="1" />
    </svg>
  );
}

export function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 011 1v4a1 1 0 01-2 0V5a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
}

export function ZoomInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function ZoomOutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="5" />
      <line x1="11" y1="11" x2="14" y2="14" />
    </svg>
  );
}

export function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1C5.24 1 3 3.24 3 6c0 4.5 5 9 5 9s5-4.5 5-9c0-2.76-2.24-5-5-5z" />
      <circle cx="8" cy="6" r="2" />
    </svg>
  );
}

export function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 10L10 6M7 5L9.5 2.5a2.12 2.12 0 113 3L10 8M9 11l-2.5 2.5a2.12 2.12 0 11-3-3L6 8" />
    </svg>
  );
}

export function WalkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="currentColor">
      <path d="M67.9,22.6c5.7,0.4,10.8-3.8,11.3-9.7c0.4-5.7-3.8-10.8-9.7-11.3c-5.7-0.4-10.8,3.8-11.3,9.7C57.8,17.1,62.2,22.2,67.9,22.6"/>
      <path d="M59,26.9c2-1.5,4.5-2.3,7.3-2.2c3.5,0.3,6.6,2.5,8.3,5.1l10.5,20.9l14.3,10c1.2,1,2,2.5,1.9,4.1c-0.1,2.6-2.5,4.5-5.1,4.2c-0.7,0-1.5-0.3-2.2-0.7L78.6,57.8c-0.4-0.4-0.9-0.9-1.2-1.5l-4-7.8l-4.7,20.8l18.6,22c0.4,0.7,0.7,1.5,0.9,2.2l5,26.5c0,0.6,0,1,0,1.5c-0.3,4-3.7,6.7-7.6,6.6c-3.2-0.3-5.6-2.6-6.4-5.6l-4.7-24.7L59.4,81l-3.5,16.1c-0.1,0.7-1.2,2.3-1.5,2.9L40,124.5c-1.5,2.2-3.8,3.7-6.6,3.4c-4-0.3-6.9-3.7-6.6-7.6c0.1-1.2,0.6-2.2,1-3.1l13.5-22.5L52.5,45l-7.3,5.9l-4,17.7c-0.4,2.2-2.6,4.1-5,4c-2.6-0.1-4.5-2.5-4.4-5.1c0-0.1,0-0.4,0.1-0.6l4.5-20.6c0.3-0.9,0.7-1.6,1.5-2.2L59,26.9z"/>
    </svg>
  );
}

export function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9h12M4 6l1-3h6l1 3M3 9v3h2v-1h6v1h2V9" />
      <circle cx="4.5" cy="11" r="1" />
      <circle cx="11.5" cy="11" r="1" />
    </svg>
  );
}

export function TrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="8" height="10" rx="2" />
      <line x1="4" y1="6" x2="12" y2="6" />
      <circle cx="6" cy="9.5" r="0.75" fill="currentColor" />
      <circle cx="10" cy="9.5" r="0.75" fill="currentColor" />
      <path d="M5 12l-1.5 2M11 12l1.5 2" />
    </svg>
  );
}
