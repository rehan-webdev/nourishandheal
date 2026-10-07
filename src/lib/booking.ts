// Shared booking domain logic (pure + browser slot store).
// Booked slots persist in localStorage so a slot shown as taken on this
// device stays taken; the authoritative record is delivered via Web3Forms.

export const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

/** Clinic open Tuesday (2) through Saturday (6). */
export function isOpenDay(d: Date): boolean {
  const day = d.getDay();
  return day >= 2 && day <= 6;
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export type DayOption = {
  iso: string;
  weekday: string;
  dayNum: number;
  month: string;
};

/** Next `count` open days, starting tomorrow. */
export function getOpenDays(count = 12): DayOption[] {
  const out: DayOption[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  let guard = 0;
  while (out.length < count && guard < 60) {
    if (isOpenDay(d)) {
      out.push({
        iso: toISODate(d),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    d.setDate(d.getDate() + 1);
    guard++;
  }
  return out;
}

export function formatSlot(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function prettyDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/* ------------------------- Local slot store ------------------------- */

const SLOTS_KEY = "nh-booked-slots-v1";
type SlotMap = Record<string, string[]>;

function readSlots(): SlotMap {
  try {
    const raw = localStorage.getItem(SLOTS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as SlotMap) : {};
  } catch {
    return {};
  }
}

export function getBookedTimes(date: string): string[] {
  return readSlots()[date] ?? [];
}

export function getFreeSlots(date: string): string[] {
  const booked = new Set(getBookedTimes(date));
  return TIME_SLOTS.filter((t) => !booked.has(t));
}

export function markSlotBooked(date: string, time: string) {
  const map = readSlots();
  map[date] = Array.from(new Set([...(map[date] ?? []), time]));
  try {
    localStorage.setItem(SLOTS_KEY, JSON.stringify(map));
  } catch {
    /* storage unavailable — availability still works in-memory */
  }
}
