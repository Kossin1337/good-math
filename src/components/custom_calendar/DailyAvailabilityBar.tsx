import React, { useMemo, useState } from "react";
import { generateAvailabilitySlots } from "../../utils/generateAvailabilitySlots";
import "./DailyAvailabilityBar.scss";

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

type UnavailableRange = { start: string; end: string };
type Selection = { start: string; end: string } | null;

interface DailyAvailabilityBarProps {
  setHour: (x: number) => void;
  setMinute: (x: number) => void;
  startHour?: number;
  endHour?: number;
  stepMinutes?: number;
  durationMinutes: number;
  unavailable?: UnavailableRange[];
  onSelect?: (start: string, end: string) => void;
}

const DailyAvailabilityBar: React.FC<DailyAvailabilityBarProps> = ({
  setHour,
  setMinute,
  startHour,
  endHour,
  stepMinutes = 30,
  durationMinutes,
  unavailable = [],
  onSelect,
}) => {
  const slots: TimeSlot[] = useMemo(
    () => generateAvailabilitySlots(startHour, endHour, stepMinutes, unavailable),
    [startHour, endHour, stepMinutes, unavailable]
  );

  console.log("unavaiable: ", unavailable);

  const [selection, setSelection] = useState<Selection>(null);

  const neededSlots = Math.ceil(durationMinutes / stepMinutes);

  const handlePick = (slot: TimeSlot, startIdx: number): void => {
    const extractedHour = Number(slot.start.slice(0, 2)); // Extract the hour (first 2 chars)
    const extractedMinute = Number(slot.start.slice(3, 5)); // Extract the minute (after the ':')
    setHour(extractedHour);
    setMinute(extractedMinute);

    const group = slots.slice(startIdx, startIdx + neededSlots);

    if (group.length < neededSlots || !group.every((s) => s.available)) return;

    const next = { start: group[0].start, end: group[group.length - 1].end };
    setSelection(next);
    onSelect?.(next.start, next.end);
  };

  const isSelected = (start: string, end: string): boolean =>
    selection ? start >= selection.start && end <= selection.end : false;

  return (
    <div className="daily-availability-grid" role="grid">
      {slots.map((slot, i) => {
        const { start, end, available } = slot;
        const selected = isSelected(start, end);

        return (
          <div
            key={start}
            className={[
              "grid-slot",
              available ? "available" : "unavailable",
              selected ? "selected" : "",
            ].join(" ")}
            title={`${start}–${end}`}
            onClick={() => available && handlePick(slot, i)}
            role="gridcell"
          >
            <span className="slot-time">{start}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DailyAvailabilityBar;
