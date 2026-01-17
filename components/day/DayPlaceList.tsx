'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTripStore } from '@/store/tripStore';
import { PlaceCard } from '@/components/place/PlaceCard';
import { TransitRow } from '@/components/transit/TransitRow';
import { GapWarning } from '@/components/gap/GapWarning';
import { addMinutes } from '@/lib/time-utils';
import type { Place, TransitSegment } from '@/types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function DayPlaceList() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const {
    currentTripId,
    currentDayId,
    trips,
    updatePlace,
    deletePlace,
    addPlace,
    reorderPlaces,
    updateTransit,
  } = useTripStore();

  const currentTrip = trips.find((t) => t.id === currentTripId);
  const currentDay = currentTrip?.days.find((d) => d.id === currentDayId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!currentDay || !currentTripId || !currentDayId) {
    return (
      <div className="flex-1 p-7 flex items-center justify-center text-[var(--text-muted)]">
        Select a day to view places
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = currentDay.places.findIndex((p) => p.id === active.id);
      const newIndex = currentDay.places.findIndex((p) => p.id === over.id);

      const newPlaceIds = [...currentDay.places.map((p) => p.id)];
      newPlaceIds.splice(oldIndex, 1);
      newPlaceIds.splice(newIndex, 0, active.id as string);

      reorderPlaces(currentTripId, currentDayId, newPlaceIds);
    }
  };

  const handleUpdatePlace = (placeId: string, updates: Partial<Place>) => {
    updatePlace(currentTripId, currentDayId, placeId, updates);
  };

  const handleDeletePlace = (placeId: string) => {
    deletePlace(currentTripId, currentDayId, placeId);
  };

  const handleDuplicatePlace = (place: Place) => {
    const newPlace: Place = {
      ...place,
      id: generateId(),
      name: `${place.name} (copy)`,
      order: place.order + 1,
    };
    addPlace(currentTripId, currentDayId, newPlace, place.id);
  };

  const handleAddPlaceAfter = (afterPlaceId: string) => {
    const newPlace: Place = {
      id: generateId(),
      order: 0,
      name: 'New Place',
      address: 'Enter address...',
      coordinates: { lat: 0, lng: 0 },
      duration: 60,
      anchorTime: null,
      notes: '',
      photos: [],
      embeds: [],
      hours: null,
      category: 'other',
    };
    addPlace(currentTripId, currentDayId, newPlace, afterPlaceId);
  };

  const handleUpdateTransit = (transitId: string, updates: Partial<TransitSegment>) => {
    updateTransit(currentTripId, currentDayId, transitId, updates);
  };

  // Calculate times for each place
  const calculatePlaceTimes = () => {
    let currentTime = currentDay.startTime;
    const times: { [placeId: string]: string } = {};

    for (let i = 0; i < currentDay.places.length; i++) {
      const place = currentDay.places[i];

      // If place has an anchor time, use it
      if (place.anchorTime) {
        currentTime = place.anchorTime;
      }

      times[place.id] = currentTime;

      // Add duration and transit time to get next start time
      currentTime = addMinutes(currentTime, place.duration);

      // Add transit time if there's a next place
      if (i < currentDay.places.length - 1) {
        const transit = currentDay.transitSegments.find(
          (t) => t.fromPlaceId === place.id
        );
        if (transit) {
          currentTime = addMinutes(currentTime, transit.duration);
        }
      }
    }

    return times;
  };

  const placeTimes = calculatePlaceTimes();

  // Calculate gaps for warning display
  const calculateGap = (currentPlace: Place, nextPlace: Place): number | null => {
    const currentEndTime = addMinutes(placeTimes[currentPlace.id], currentPlace.duration);
    const transit = currentDay.transitSegments.find(
      (t) => t.fromPlaceId === currentPlace.id && t.toPlaceId === nextPlace.id
    );
    const transitTime = transit?.duration || 0;

    const expectedNextStart = addMinutes(currentEndTime, transitTime);
    const actualNextStart = nextPlace.anchorTime || expectedNextStart;

    // Parse times to compare
    const [expectedHours, expectedMins] = expectedNextStart.split(':').map(Number);
    const [actualHours, actualMins] = actualNextStart.split(':').map(Number);

    const expectedTotal = expectedHours * 60 + expectedMins;
    const actualTotal = actualHours * 60 + actualMins;

    const gap = actualTotal - expectedTotal;

    // Only show warning for gaps > 2 hours (120 minutes)
    return gap > 120 ? gap : null;
  };

  // Don't render DndContext on server to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex-1 px-[28px] py-[20px] pb-[80px] overflow-y-auto">
        <div className="flex flex-col">
          {currentDay.places.map((place) => (
            <div key={place.id} className="mb-[6px] bg-[var(--surface)] border border-[var(--border)] p-4">
              <h3 className="text-[14px] font-semibold text-[var(--text)]">{place.name}</h3>
              <p className="text-[11px] text-[var(--text-muted)]">{place.address}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-[28px] py-[20px] pb-[80px] overflow-y-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={currentDay.places.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col">
            {currentDay.places.map((place, index) => {
              const transit = currentDay.transitSegments.find(
                (t) => t.fromPlaceId === place.id
              );
              const nextPlace = currentDay.places[index + 1];
              const gap = nextPlace ? calculateGap(place, nextPlace) : null;

              return (
                <div key={place.id} className="flex flex-col">
                  <PlaceCard
                    place={place}
                    startTime={placeTimes[place.id]}
                    onUpdate={(updates) => handleUpdatePlace(place.id, updates)}
                    onDelete={() => handleDeletePlace(place.id)}
                    onDuplicate={() => handleDuplicatePlace(place)}
                    onAddAfter={() => handleAddPlaceAfter(place.id)}
                  />

                  {transit && index < currentDay.places.length - 1 && (
                    <TransitRow
                      transit={transit}
                      onUpdate={(updates) => handleUpdateTransit(transit.id, updates)}
                    />
                  )}

                  {gap && nextPlace && (
                    <GapWarning
                      gapMinutes={gap}
                      nextPlaceName={nextPlace.name}
                      onAddPlace={() => handleAddPlaceAfter(place.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
