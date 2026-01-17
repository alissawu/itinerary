'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Place } from '@/types';
import { ZoomInIcon, ZoomOutIcon, LocationIcon } from '@/components/ui/Icons';

interface MockMapViewProps {
  places: Place[];
  selectedPlaceId: string | null;
  onSelectPlace: (placeId: string) => void;
}

interface CompactPlaceItemProps {
  place: Place;
  index: number;
  isActive: boolean;
  timeDisplay: string;
  onClick: () => void;
}

function CompactPlaceItem({ place, index, isActive, timeDisplay, onClick }: CompactPlaceItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 px-[18px] py-3 cursor-pointer border-l-[3px] transition-colors ${
        isActive
          ? 'bg-accent-soft border-l-accent'
          : 'border-l-transparent hover:bg-active-bg'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${
          isActive ? 'bg-accent text-white' : 'bg-text text-surface'
        }`}
      >
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold mb-0.5 truncate">{place.name}</div>
        <div className="font-mono text-[11px] text-text-muted mb-1">{timeDisplay}</div>
        <div className="text-[11px] text-text-muted truncate">{place.address.split(',')[0]}</div>
      </div>
      {place.photos[0] && (
        <Image
          src={place.photos[0]}
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded shrink-0"
        />
      )}
    </div>
  );
}

function CompactTransit({ duration }: { duration: number }) {
  return (
    <div className="flex items-center gap-2 px-[18px] py-1.5 pl-[30px] text-[11px] text-text-muted">
      <div className="w-0.5 h-5 bg-border-dark mr-2" />
      Walk {duration} min
    </div>
  );
}

export function MockMapView({ places, selectedPlaceId, onSelectPlace }: MockMapViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectPlace = (placeId: string, index: number) => {
    setActiveIndex(index);
    onSelectPlace(placeId);
  };

  // Mock pin positions (would be calculated from real coordinates)
  const pinPositions = [
    { left: '25%', top: '30%' },
    { left: '40%', top: '47%' },
    { left: '48%', top: '57%' },
    { left: '63%', top: '75%' },
  ];

  return (
    <div className="flex flex-1">
      {/* Compact List Panel */}
      <div className="w-80 bg-surface border-r border-border flex flex-col">
        <div className="px-[18px] py-4 border-b border-border">
          <div className="text-[13px] text-text-secondary">
            <strong className="text-text font-semibold">Day 1</strong> · Saturday
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          {places.map((place, index) => (
            <div key={place.id}>
              <CompactPlaceItem
                place={place}
                index={index}
                isActive={index === activeIndex}
                timeDisplay="10:00–11:30"
                onClick={() => handleSelectPlace(place.id, index)}
              />
              {index < places.length - 1 && <CompactTransit duration={12} />}
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-[#ebe7df] overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(90deg, transparent, transparent 100px, #d8d4cc 100px, #d8d4cc 102px),
              repeating-linear-gradient(0deg, transparent, transparent 80px, #d8d4cc 80px, #d8d4cc 82px),
              #ebe7df
            `,
          }}
        />

        {/* Route SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
        >
          <path
            d="M 200 180 Q 280 200 320 280 Q 340 320 380 340 Q 450 380 500 450"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray="8 4"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        {/* Map Pins */}
        {places.slice(0, 4).map((place, index) => (
          <div
            key={place.id}
            className={`absolute cursor-pointer transition-transform z-10 ${
              index === activeIndex
                ? 'scale-125 z-20'
                : 'hover:scale-110'
            }`}
            style={{
              left: pinPositions[index]?.left || '50%',
              top: pinPositions[index]?.top || '50%',
              transform: 'translate(-50%, -100%)',
            }}
            onClick={() => handleSelectPlace(place.id, index)}
          >
            <div
              className={`w-8 h-8 rounded-full rounded-bl-none rotate-[-45deg] flex items-center justify-center shadow-lg ${
                index === activeIndex ? 'bg-accent shadow-accent/40' : 'bg-text'
              }`}
            >
              <span className="rotate-45 text-white text-xs font-semibold">
                {index + 1}
              </span>
            </div>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-surface border border-border rounded-md text-[11px] font-medium whitespace-nowrap shadow-md transition-opacity ${
                index === activeIndex ? 'opacity-100 bg-accent text-white border-accent' : 'opacity-0 hover:opacity-100'
              }`}
            >
              {place.name}
            </div>
          </div>
        ))}

        {/* Current viewing card */}
        <div className="absolute top-4 left-4 flex items-center gap-2.5 px-4 py-3 bg-surface border border-border rounded-lg shadow-md">
          <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
          <div className="text-xs">
            Viewing: <strong className="font-semibold">{places[activeIndex]?.name}</strong>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-5 right-5 flex flex-col gap-1">
          <button className="w-9 h-9 bg-surface border border-border rounded-md flex items-center justify-center hover:bg-active-bg">
            <ZoomInIcon className="w-[18px] h-[18px] text-text-secondary" />
          </button>
          <button className="w-9 h-9 bg-surface border border-border rounded-md flex items-center justify-center hover:bg-active-bg">
            <ZoomOutIcon className="w-[18px] h-[18px] text-text-secondary" />
          </button>
          <button className="w-9 h-9 bg-surface border border-border rounded-md flex items-center justify-center hover:bg-active-bg">
            <LocationIcon className="w-[18px] h-[18px] text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}
