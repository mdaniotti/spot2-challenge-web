export const APP_NAME = "Spot2-ShortedUrl";

// Time constants in milliseconds
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const EXPIRATION_TIMES = {
  "5m": 5 * MINUTE,
  "30m": 30 * MINUTE,
  "1h": HOUR,
  "6h": 6 * HOUR,
  "1d": DAY,
  "1w": WEEK,
  never: null,
} as const;

export const EXPIRATION_OPTIONS = [
  { value: "", label: "Select expiration time" },
  { value: "5m", label: "5 minutes" },
  { value: "30m", label: "30 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "6h", label: "6 hours" },
  { value: "1d", label: "1 day" },
  { value: "1w", label: "1 week" },
  { value: "never", label: "Never" },
] as const;
