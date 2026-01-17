'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Trip, Day, Place, TransitSegment, ViewMode } from '@/types';

interface TripState {
  trips: Trip[];
  currentTripId: string | null;
  currentDayId: string | null;
  viewMode: ViewMode;

  // Actions
  setCurrentTrip: (tripId: string) => void;
  setCurrentDay: (dayId: string) => void;
  setViewMode: (mode: ViewMode) => void;

  // Trip CRUD
  addTrip: (trip: Trip) => void;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;

  // Day operations
  updateDay: (tripId: string, dayId: string, updates: Partial<Day>) => void;

  // Place CRUD
  addPlace: (tripId: string, dayId: string, place: Place, afterPlaceId?: string) => void;
  updatePlace: (tripId: string, dayId: string, placeId: string, updates: Partial<Place>) => void;
  deletePlace: (tripId: string, dayId: string, placeId: string) => void;
  reorderPlaces: (tripId: string, dayId: string, placeIds: string[]) => void;

  // Transit operations
  updateTransit: (tripId: string, dayId: string, transitId: string, updates: Partial<TransitSegment>) => void;

  // Computed
  getCurrentTrip: () => Trip | undefined;
  getCurrentDay: () => Day | undefined;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Sample NYC trip data
const sampleTrip: Trip = {
  id: 'trip-1',
  title: "A's NYC Favorites",
  startDate: '2026-01-18',
  endDate: '2026-01-20',
  days: [
    {
      id: 'day-1',
      dayNumber: 1,
      date: '2026-01-18',
      startTime: '10:00',
      places: [
        {
          id: 'place-1',
          order: 0,
          name: 'Florea',
          address: '41 Spring St, New York, NY 10012',
          coordinates: { lat: 40.7223, lng: -73.9969 },
          duration: 90,
          anchorTime: null,
          notes: 'Get the matcha croissant. The space is small so you might want to take your order to go and walk around SoHo.',
          photos: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=112&h=112&fit=crop',
            'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=112&h=112&fit=crop',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=112&h=112&fit=crop',
          ],
          embeds: [
            {
              id: 'embed-1',
              url: 'https://tiktok.com/example',
              thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=176&h=112&fit=crop',
              source: 'tiktok',
              type: 'video',
            },
            {
              id: 'embed-2',
              url: 'https://instagram.com/example',
              thumbnailUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=176&h=112&fit=crop',
              source: 'instagram',
              type: 'slideshow',
            },
          ],
          hours: { saturday: { open: '10:00', close: '18:00' } },
          category: 'cafe',
        },
        {
          id: 'place-2',
          order: 1,
          name: 'Coming Soon',
          address: '53 Howard St, New York, NY 10013',
          coordinates: { lat: 40.7195, lng: -73.9995 },
          duration: 120,
          anchorTime: null,
          notes: 'Best vintage in SoHo. Pricey but quality pieces. Check for new arrivals on Fridays.',
          photos: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=112&h=112&fit=crop',
            'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=112&h=112&fit=crop',
          ],
          embeds: [
            {
              id: 'embed-3',
              url: 'https://instagram.com/example2',
              thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=176&h=112&fit=crop',
              source: 'instagram',
              type: 'slideshow',
            },
            {
              id: 'embed-4',
              url: 'https://instagram.com/reel',
              thumbnailUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=176&h=112&fit=crop',
              source: 'reel',
              type: 'video',
            },
          ],
          hours: { saturday: { open: '11:00', close: '19:00' } },
          category: 'shopping',
        },
        {
          id: 'place-3',
          order: 2,
          name: 'McNally Jackson',
          address: '52 Prince St, New York, NY 10012',
          coordinates: { lat: 40.7234, lng: -73.9945 },
          duration: 45,
          anchorTime: null,
          notes: 'Independent bookstore. Check the design section upstairs. They also have a nice stationery selection.',
          photos: [
            'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=112&h=112&fit=crop',
            'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=112&h=112&fit=crop',
          ],
          embeds: [
            {
              id: 'embed-5',
              url: 'https://youtube.com/example',
              thumbnailUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=176&h=112&fit=crop',
              source: 'youtube',
              type: 'video',
            },
          ],
          hours: { saturday: { open: '10:00', close: '21:00' } },
          category: 'bookstore',
        },
        {
          id: 'place-4',
          order: 3,
          name: 'Carbone',
          address: '181 Thompson St, New York, NY 10012',
          coordinates: { lat: 40.7272, lng: -73.9993 },
          duration: 120,
          anchorTime: '19:30',
          notes: 'Reservation confirmed. Ask for the spicy rigatoni. Dress code: smart casual.',
          photos: [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=112&h=112&fit=crop',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=112&h=112&fit=crop',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=112&h=112&fit=crop',
          ],
          embeds: [
            {
              id: 'embed-6',
              url: 'https://tiktok.com/example2',
              thumbnailUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=176&h=112&fit=crop',
              source: 'tiktok',
              type: 'video',
            },
            {
              id: 'embed-7',
              url: 'https://instagram.com/example3',
              thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=176&h=112&fit=crop',
              source: 'instagram',
              type: 'slideshow',
            },
          ],
          hours: { saturday: { open: '17:00', close: '23:00' } },
          category: 'restaurant',
        },
      ],
      transitSegments: [
        {
          id: 'transit-1',
          fromPlaceId: 'place-1',
          toPlaceId: 'place-2',
          mode: 'walk',
          duration: 12,
          routeSummary: 'via Lafayette St',
        },
        {
          id: 'transit-2',
          fromPlaceId: 'place-2',
          toPlaceId: 'place-3',
          mode: 'walk',
          duration: 8,
          routeSummary: 'via Broadway',
        },
        {
          id: 'transit-3',
          fromPlaceId: 'place-3',
          toPlaceId: 'place-4',
          mode: 'walk',
          duration: 10,
          routeSummary: 'via Thompson St',
        },
      ],
    },
    {
      id: 'day-2',
      dayNumber: 2,
      date: '2026-01-19',
      startTime: '09:30',
      places: [],
      transitSegments: [],
    },
    {
      id: 'day-3',
      dayNumber: 3,
      date: '2026-01-20',
      startTime: '10:00',
      places: [],
      transitSegments: [],
    },
  ],
};

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trips: [sampleTrip],
      currentTripId: 'trip-1',
      currentDayId: 'day-1',
      viewMode: 'detail',

      setCurrentTrip: (tripId) => set({ currentTripId: tripId }),
      setCurrentDay: (dayId) => set({ currentDayId: dayId }),
      setViewMode: (mode) => set({ viewMode: mode }),

      addTrip: (trip) =>
        set((state) => ({
          trips: [...state.trips, trip],
        })),

      updateTrip: (tripId, updates) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId ? { ...trip, ...updates } : trip
          ),
        })),

      deleteTrip: (tripId) =>
        set((state) => ({
          trips: state.trips.filter((trip) => trip.id !== tripId),
          currentTripId:
            state.currentTripId === tripId ? null : state.currentTripId,
        })),

      updateDay: (tripId, dayId, updates) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  days: trip.days.map((day) =>
                    day.id === dayId ? { ...day, ...updates } : day
                  ),
                }
              : trip
          ),
        })),

      addPlace: (tripId, dayId, place, afterPlaceId) =>
        set((state) => ({
          trips: state.trips.map((trip) => {
            if (trip.id !== tripId) return trip;
            return {
              ...trip,
              days: trip.days.map((day) => {
                if (day.id !== dayId) return day;
                const places = [...day.places];
                if (afterPlaceId) {
                  const index = places.findIndex((p) => p.id === afterPlaceId);
                  places.splice(index + 1, 0, place);
                } else {
                  places.push(place);
                }
                return {
                  ...day,
                  places: places.map((p, i) => ({ ...p, order: i })),
                };
              }),
            };
          }),
        })),

      updatePlace: (tripId, dayId, placeId, updates) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  days: trip.days.map((day) =>
                    day.id === dayId
                      ? {
                          ...day,
                          places: day.places.map((place) =>
                            place.id === placeId
                              ? { ...place, ...updates }
                              : place
                          ),
                        }
                      : day
                  ),
                }
              : trip
          ),
        })),

      deletePlace: (tripId, dayId, placeId) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  days: trip.days.map((day) =>
                    day.id === dayId
                      ? {
                          ...day,
                          places: day.places
                            .filter((place) => place.id !== placeId)
                            .map((p, i) => ({ ...p, order: i })),
                          transitSegments: day.transitSegments.filter(
                            (t) =>
                              t.fromPlaceId !== placeId &&
                              t.toPlaceId !== placeId
                          ),
                        }
                      : day
                  ),
                }
              : trip
          ),
        })),

      reorderPlaces: (tripId, dayId, placeIds) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  days: trip.days.map((day) => {
                    if (day.id !== dayId) return day;
                    const placeMap = new Map(
                      day.places.map((p) => [p.id, p])
                    );
                    const reorderedPlaces = placeIds
                      .map((id) => placeMap.get(id))
                      .filter((p): p is Place => p !== undefined)
                      .map((p, i) => ({ ...p, order: i }));
                    return { ...day, places: reorderedPlaces };
                  }),
                }
              : trip
          ),
        })),

      updateTransit: (tripId, dayId, transitId, updates) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  days: trip.days.map((day) =>
                    day.id === dayId
                      ? {
                          ...day,
                          transitSegments: day.transitSegments.map((transit) =>
                            transit.id === transitId
                              ? { ...transit, ...updates }
                              : transit
                          ),
                        }
                      : day
                  ),
                }
              : trip
          ),
        })),

      getCurrentTrip: () => {
        const state = get();
        return state.trips.find((t) => t.id === state.currentTripId);
      },

      getCurrentDay: () => {
        const state = get();
        const trip = state.trips.find((t) => t.id === state.currentTripId);
        return trip?.days.find((d) => d.id === state.currentDayId);
      },
    }),
    {
      name: 'itinerary-storage',
    }
  )
);
