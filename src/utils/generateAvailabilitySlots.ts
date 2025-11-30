/**
 * Generate time slots for a given day and working hours.
 *
 * @param startHour - e.g. 9
 * @param endHour - e.g. 17
 * @param stepMinutes - e.g. 30, 60, 90, 120
 * @param unavailable - array of intervals to exclude (e.g. [{ start: "10:30", end: "11:30" }])
 * @returns array of { start, end, available }
 */
export function generateAvailabilitySlots(
  startHour: number,
  endHour: number,
  stepMinutes: number,
  unavailable: { start: string; end: string }[] = []
) {
  const slots: { start: string; end: string; available: boolean }[] = [];

  const pad = (n: number) => n.toString().padStart(2, "0");

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const start = `${pad(h)}:${pad(m)}`;
      const endMinutes = h * 60 + m + stepMinutes;
      const endHourVal = Math.floor(endMinutes / 60);
      const endMinuteVal = endMinutes % 60;
      const end = `${pad(endHourVal)}:${pad(endMinuteVal)}`;

      const isOverlapping = unavailable.some((busy) => {
        return !(end <= busy.start || start >= busy.end);
      });

      slots.push({ start, end, available: !isOverlapping });
    }
  }

  return slots;
}