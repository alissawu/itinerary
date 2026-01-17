export function parseTime(timeStr: string): { hours: number; minutes: number } {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }
  return {
    hours: parseInt(match[1], 10),
    minutes: parseInt(match[2], 10),
  };
}

export function formatTime(hours: number, minutes: number): string {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function formatTime12h(timeStr: string): string {
  const { hours, minutes } = parseTime(timeStr);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function addMinutes(timeStr: string, minutesToAdd: number): string {
  const { hours, minutes } = parseTime(timeStr);
  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return formatTime(newHours, newMinutes);
}

export function getMinutesBetween(startTime: string, endTime: string): number {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const startMinutes = start.hours * 60 + start.minutes;
  const endMinutes = end.hours * 60 + end.minutes;
  return endMinutes - startMinutes;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

export function formatDurationLong(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

export function formatTimeRange(startTime: string, durationMinutes: number): string {
  const endTime = addMinutes(startTime, durationMinutes);
  return `${startTime}–${endTime}`;
}

export function durationToHoursMinutes(totalMinutes: number): { hours: number; minutes: number } {
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}

export function hoursMinutesToDuration(hours: number, minutes: number): number {
  return hours * 60 + Math.min(59, Math.max(0, minutes));
}

export function validateMinutes(value: number): number {
  return Math.min(59, Math.max(0, Math.floor(value)));
}

export function validateHours(value: number): number {
  return Math.max(0, Math.floor(value));
}
