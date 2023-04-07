import { format } from 'date-fns';

/**
 * Gets a date that is in some timezone and puts it in clients time zone
 * Dates with no timezone indicated are interpreted as UTC
 * @param date Date object
 * @returns date in clients timezone
 */
export function parseDate(date: Date): Date {
  return new Date(
    new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60 * 1000,
  );
}

/**
 * takes a timestamp and creates a date out of it converted to our timezone
 * Timestamps with no timezone indicated are interpreted as UTC
 *
 * @param timestampStr timestamp string
 * @returns date in clients timezone
 */
export function parseTimestamp(timestampStr: string): Date {
  return parseDate(new Date(timestampStr));
}

/**
 * similar to `new Date(year, month, ...)` except with 1 indexed months ffs
 *
 */
export function createDate(
  year: number = 1970,
  month: number = 1,
  date: number = 1,
  hour: number = 0,
  minute: number = 0,
  second: number = 0,
): Date {
  return new Date(year, month - 1, date, hour, minute, second);
}

export function queryParamDateFormat(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions,
): string {
  return date.toLocaleDateString('en-us', options);
}

export function stripTimezone(date: Date): Date {
  return new Date(date!.toISOString().split('T')[0]);
}
