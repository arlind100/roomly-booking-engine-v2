import { isWeekend, eachDayOfInterval } from 'date-fns';
import type { PricingOverride } from './types';

export function getDayPrice(
  date: Date,
  roomId: string,
  basePrice: number,
  weekendPrice: number | null | undefined,
  overrides: PricingOverride[],
): number {
  const override = overrides.find(o => {
    if (o.room_type_id !== roomId || !o.is_active) return false;
    const start = new Date(o.start_date + 'T00:00:00');
    const end = new Date(o.end_date + 'T00:00:00');
    return date >= start && date <= end;
  });
  if (override) return Number(override.price);
  if (weekendPrice && isWeekend(date)) return Number(weekendPrice);
  return Number(basePrice);
}

export function calcRoomTotal(
  checkIn: Date,
  checkOut: Date,
  roomId: string,
  basePrice: number,
  weekendPrice: number | null | undefined,
  overrides: PricingOverride[],
): number {
  const days = eachDayOfInterval({ start: checkIn, end: new Date(checkOut.getTime() - 86400000) });
  return days.reduce((sum, day) => sum + getDayPrice(day, roomId, basePrice, weekendPrice, overrides), 0);
}
