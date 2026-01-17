export interface Trip {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  days: Day[];
}

export interface Day {
  id: string;
  dayNumber: number;
  date: string;
  startTime: string; // "10:00"
  places: Place[];
  transitSegments: TransitSegment[];
}

export interface Place {
  id: string;
  order: number;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  duration: number; // minutes
  anchorTime: string | null; // "19:30" or null
  notes: string;
  photos: string[];
  embeds: PlaceEmbed[];
  hours: { [day: string]: { open: string; close: string } | null } | null;
  category: string;
}

export interface PlaceEmbed {
  id: string;
  url: string;
  thumbnailUrl: string;
  source: 'tiktok' | 'instagram' | 'youtube' | 'reel' | 'other';
  type: 'video' | 'slideshow' | 'link';
  title?: string;
}

export interface TransitSegment {
  id: string;
  fromPlaceId: string;
  toPlaceId: string;
  mode: 'walk' | 'drive' | 'transit' | 'custom';
  duration: number; // minutes (user-editable for custom)
  routeSummary: string;
}

export type ViewMode = 'detail' | 'compact' | 'map';

export interface TimeSlot {
  start: string; // "10:00"
  end: string; // "11:30"
}
