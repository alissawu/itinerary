'use client';

import { useState } from 'react';
import { MenuDotsIcon, EditIcon, DuplicateIcon, MoveIcon, TrashIcon } from '@/components/ui/Icons';

interface PlaceContextMenuProps {
  isVisible: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onMoveToDay: () => void;
  onDelete: () => void;
}

export function PlaceContextMenu({
  isVisible,
  onEdit,
  onDuplicate,
  onMoveToDay,
  onDelete,
}: PlaceContextMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="absolute top-2 right-2 z-10"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button
        className={`w-7 h-7 bg-[var(--surface)] border border-[var(--border)] rounded-md flex items-center justify-center transition-all ${
          isVisible || showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        } hover:bg-[var(--active-bg)] hover:border-[var(--border-dark)]`}
      >
        <MenuDotsIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
      </button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-1 bg-[var(--surface)] border border-[var(--border-dark)] rounded-lg shadow-lg min-w-[160px] py-1 z-50">
          <button
            onClick={onEdit}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--text)] hover:bg-[var(--active-bg)] rounded-t-lg"
          >
            <EditIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Edit
          </button>
          <button
            onClick={onDuplicate}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--text)] hover:bg-[var(--active-bg)]"
          >
            <DuplicateIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Duplicate
          </button>
          <button
            onClick={onMoveToDay}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--text)] hover:bg-[var(--active-bg)]"
          >
            <MoveIcon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Move to day...
          </button>
          <div className="h-px bg-[var(--border)] my-1" />
          <button
            onClick={onDelete}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] text-[var(--danger)] hover:bg-[var(--danger-soft)] rounded-b-lg"
          >
            <TrashIcon className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
