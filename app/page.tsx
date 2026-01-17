'use client';

import { useState } from 'react';
import { useTripStore } from '@/store/tripStore';
import { DaySidebar } from '@/components/day/DaySidebar';
import { DayHeader } from '@/components/day/DayHeader';
import { DayPlaceList } from '@/components/day/DayPlaceList';
import { MockMapView } from '@/components/map/MockMapView';

export default function Home() {
  const { viewMode, currentTripId, currentDayId, trips } = useTripStore();
  const [selectedMapPlaceId, setSelectedMapPlaceId] = useState<string | null>(null);

  const currentTrip = trips.find((t) => t.id === currentTripId);
  const currentDay = currentTrip?.days.find((d) => d.id === currentDayId);

  return (
    <div className="grid grid-cols-[200px_1fr] min-h-screen bg-[var(--bg)]">
      <DaySidebar />

      {viewMode === 'map' ? (
        <MockMapView
          places={currentDay?.places || []}
          selectedPlaceId={selectedMapPlaceId}
          onSelectPlace={setSelectedMapPlaceId}
        />
      ) : (
        <main className="flex flex-col">
          <DayHeader />
          <DayPlaceList />
        </main>
      )}
    </div>
  );
}
