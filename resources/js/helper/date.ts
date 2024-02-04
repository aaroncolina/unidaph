export function dateToDateTimeString(date: Date) {
  return date?.toISOString().slice(0, 19).replace('T', ' ');
}

export function dateToDateString(date: Date) {
  return date?.toISOString().slice(0, 10).replace('T', '');
}

export function computeDateOfBirth(date: Date) {
  const diff_ms = Date.now() - date.getTime();
  return Math.abs(new Date(diff_ms).getUTCFullYear() - 1970);
}
