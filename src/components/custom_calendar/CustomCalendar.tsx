import React, { useEffect, useState } from "react";
import { DayPicker, type Matcher } from "react-day-picker";
import { pl } from "date-fns/locale";

// import { generateAvailabilitySlots } from "../../utils/generateAvailabilitySlots";
// import DailyAvailabilityBar, { BusyRange } from "./DailyAvailabilityBar";

import CalendarForm from "./form/CalendarForm";
// import CustomHourPicker from "./CustomHourPicker";
import DailyAvailabilityBar from "./DailyAvailabilityBar";

import "react-day-picker/style.css";
import "./CustomCalendar.scss";
// import { late } from "zod/v3";

interface ICustomCalendar {
  onClose: () => void;
}

type WorkingHours = { start: number; end: number };

// Warsaw weekday index: 0=Sun ... 6=Sat
const WORKING_HOURS: Record<number, WorkingHours | null> = {
  0: { start: 10, end: 16 }, // niedziela
  1: { start: 13, end: 21 }, // pon
  2: { start: 15, end: 21 }, // wt
  3: { start: 12, end: 21 }, // śr
  4: { start: 12, end: 20 }, // czw
  5: { start: 13, end: 20 }, // pt
  6: null, // sobota wolne
};

const weekdayIndexInWarsaw = (d: Date): number => {
  const short = d.toLocaleDateString("en-US", { weekday: "short", timeZone: "Europe/Warsaw" });
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return map[short];
};

type MeetingSlot = {
  id: string; // unique id
  dateISO: string; // yyyy-mm-dd (local)
  weekday: string; // localized weekday (pl-PL)
  startHour: number; // 9..17
  startMinute: number; // 0|30
  durationMinutes: number; // 60|90|120...
};

type UnavailableRange = { start: string; end: string };

const CustomCalendar: React.FC<ICustomCalendar> = ({ onClose }) => {
  const [unavailableRanges, setUnavailableRanges] = useState<UnavailableRange[]>([]);
  const [step, setStep] = useState<1 | 2>(1); // step 1 - calendar, step 2 - form

  /* MOST IMPORTANT VARIABLE */
  const [selectedSlots, setSelectedSlots] = useState<MeetingSlot[]>([]); // multiple properties for the future

  const [pendingDay, setPendingDay] = useState<Date | null>(null); // day waiting for time selection

  const [dayStart, setDayStart] = useState<number>(9); // DAY START
  const [dayEnd, setDayEnd] = useState<number>(23); // DAY END
  const [selectedHour, setSelectedHour] = useState<number | undefined>(); // Starting hour | on default 1st avaiable time
  const [selectedMinute, setSelectedMinute] = useState<number | undefined>(); // Starting hour | calculated based on start
  const [timeDuration, setTimeDuration] = useState<number>(60); // duration in minutes (1H default)

  /* USABLE VARIABLES */

  /* GET TODAY & in 30-days */
  // today at midnight (local)
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  // max allowed day = today + 30
  const maxDay = new Date(tomorrow);
  maxDay.setDate(tomorrow.getDate() + 30);

  // useEffect(() => {
  //   /* Fetch AVAIABILITY DATA for whole calendar - freebusy */
  // }, [])

  // helper functions BEFORE useEffect
  // const toDateISO = (d: Date): string => {
  //   const year = d.getFullYear();
  //   const month = String(d.getMonth() + 1).padStart(2, "0");
  //   const day = String(d.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  // const weekdayName = (d: Date): string =>
  //   d.toLocaleDateString("pl-PL", { weekday: "long", timeZone: "Europe/Warsaw" });

  /* GET FREE BUSY QUERY FROM GOOGLE CALENDAR */
  useEffect(() => {
    if (!pendingDay) return;

    const dateISO = toDateISO(pendingDay);

    // 1) Set working hours from weekday (Warsaw), NOT from busy ranges
    const weekdayIdx = weekdayIndexInWarsaw(pendingDay);
    const hours = WORKING_HOURS[weekdayIdx];

    if (!hours) {
      // Saturday off
      setDayStart(9);
      setDayEnd(9);
      setUnavailableRanges([]);
      return;
    }

    setDayStart(hours.start);
    setDayEnd(hours.end);

    const fetchFreeBusy = async () => {
      try {
        const res = await fetch(`/api/freebusy?date=${dateISO}`);
        console.log("fetchFreeBusy res:", res);
        if (!res.ok) throw new Error("Failed to fetch free/busy");

        const busy: Array<{ start: string; end: string }> = await res.json();
        console.log("BUSY:", busy);

        const fmt = (d: Date) =>
          d.toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Europe/Warsaw",
          });

        const ranges: UnavailableRange[] = busy.map((b) => ({
          start: fmt(new Date(b.start)),
          end: fmt(new Date(b.end)),
        }));

        setUnavailableRanges(ranges);
      } catch (err) {
        console.error("Free/busy fetch error", err);
        setUnavailableRanges([]);
      }
    };

    void fetchFreeBusy();
  }, [pendingDay]);

  // Disable all days outside this interval
  const disabledDays: Matcher[] = [
    { before: tomorrow },
    { after: maxDay },
    { dayOfWeek: [6] }, // Saturday
  ];

  const toDateISO = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const weekdayName = (d: Date) =>
    d.toLocaleDateString("pl-PL", { weekday: "long", timeZone: "Europe/Warsaw" });

  const handleDayClick = (day: Date) => {
    // If a pending day exists, block clicking other days (force confirm/cancel)
    if (pendingDay) {
      // if user clicks the same pending day, ignore
      if (pendingDay.toDateString() === day.toDateString()) return;

      // user clicked a new day — update pendingDay and reset hour picker
      setPendingDay(day);
      return;
    }

    // If this day already has a slot selected, remove it (toggle)
    const existing = selectedSlots.find((s) => s.dateISO === toDateISO(day));
    if (existing) {
      setSelectedSlots((prev) => prev.filter((p) => p.id !== existing.id));
      return;
    }

    // Start pending flow: require user to pick time
    setPendingDay(day);
  };

  // called by CustomHourPicker when user confirms time for pendingDay
  const handleTimeSelected = (hour: number, minute: number) => {
    if (!pendingDay) return;

    const newSlot: MeetingSlot = {
      id: `${toDateISO(pendingDay)}T${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`,
      dateISO: toDateISO(pendingDay),
      weekday: weekdayName(pendingDay),
      startHour: hour,
      startMinute: minute,
      durationMinutes: timeDuration,
    };

    console.log("NEW SLOT: ", newSlot);

    setSelectedSlots((prev) => [...prev, newSlot]);
    setPendingDay(null);
  };

  /* SELECT IT LATER BECAUSE IT CAN BE VALUABLE - with other parameters and check */
  // const cancelPending = () => setPendingDay(null);

  // const toWarsawTime = (slot: MeetingSlot) => {
  //   const dt = new Date(
  //     `${slot.dateISO}T${String(slot.startHour).padStart(2, "0")}:${String(
  //       slot.startMinute
  //     ).padStart(2, "0")}:00`
  //   );
  //   return dt.toLocaleString("pl-PL", {
  //     timeZone: "Europe/Warsaw",
  //     dateStyle: "full",
  //     timeStyle: "short",
  //   });
  // };

  return (
    <div className="custom-calendar">
      <button className="close-x" onClick={onClose}>
        ✕
      </button>
      <h1 className="modal-title">Zaplanuj Spotkanie</h1>

      {step === 1 && (
        <div className="time-options">
          <div
            className={`time-option ${timeDuration === 60 ? "active" : ""}`}
            onClick={() => setTimeDuration(60)}
          >
            1H
          </div>
          <div
            className={`time-option ${timeDuration === 90 ? "active" : ""}`}
            onClick={() => setTimeDuration(90)}
          >
            1.5H
          </div>
          <div
            className={`time-option ${timeDuration === 120 ? "active" : ""}`}
            onClick={() => setTimeDuration(120)}
          >
            2H
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="calendar-step">
          <DayPicker
            mode="single"
            locale={pl}
            weekStartsOn={1}
            selected={pendingDay ?? undefined}
            disabled={disabledDays}
            onDayClick={handleDayClick}
            modifiersClassNames={{
              selected: "my-selected",
              today: "my-today",
            }}
          />

          {pendingDay && (
            <DailyAvailabilityBar
              setHour={setSelectedHour}
              setMinute={setSelectedMinute}
              startHour={dayStart}
              endHour={dayEnd}
              stepMinutes={30}
              durationMinutes={timeDuration}
              unavailable={unavailableRanges}
              onSelect={(start, end) => {
                // setSelectedHour(start);
                console.log("Wybrano:", start, "→", end);
              }}
            />
          )}

          {/* show hour picker if pendingDay is set */}
          {/* {pendingDay && (
            <div className="hour-picker-wrap">
              <CustomHourPicker
                hour={selectedHour}
                setHour={setSelectedHour}
                minute={selectedMinute}
                setMinute={setSelectedMinute}
              />
            </div>
          )} */}

          {/* CONFIRM BUTTON */}
          {pendingDay && (
            <button
              className="approve-date-btn"
              onClick={() => {
                if (selectedHour == null || selectedMinute == null) {
                  alert("Wybierz godzinę i minutę przed zatwierdzeniem spotkania.");
                  return;
                }

                handleTimeSelected(selectedHour, selectedMinute);
              }}
            >
              Zatwierdź Spotkanie
            </button>
          )}

          <div className="sidebar">
            <h3>Wybrane terminy</h3>

            {selectedSlots.length === 0 ? (
              <p>Brak wybranych terminów</p>
            ) : (
              <table className="slots-table">
                <thead>
                  <tr>
                    <th>Dzień</th>
                    <th>Data</th>
                    <th>Czas</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSlots.map((s) => {
                    // console.log("Selected SLOT: ", s);
                    // 🕒 Compute start time as HH:MM string
                    const startDate = `${String(s.startHour).padStart(2, "0")}:${String(
                      s.startMinute
                    ).padStart(2, "0")}`;

                    // 🕓 Compute end time by adding duration
                    const endDate = new Date(`${s.dateISO}T${startDate}:00`);
                    endDate.setMinutes(endDate.getMinutes() + s.durationMinutes);

                    // 🕛 Format end time as HH:MM string
                    const formattedEnd = `${String(endDate.getHours()).padStart(2, "0")}:${String(
                      endDate.getMinutes()
                    ).padStart(2, "0")}`;

                    return (
                      <tr key={s.id} className="data-row">
                        <td>{s.weekday.charAt(0).toUpperCase() + s.weekday.slice(1)}</td>
                        <td>{new Date(s.dateISO).toLocaleDateString("pl-PL")}</td>
                        <td>
                          {startDate}- {formattedEnd}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              setSelectedSlots((prev) => prev.filter((p) => p.id !== s.id))
                            }
                            className="remove-slot"
                          >
                            Usuń
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <button
            disabled={selectedSlots.length === 0}
            className="next-step-btn"
            onClick={() => setStep(2)}
          >
            Dane Kontaktowe →
          </button>
        </div>
      )}

      {/* STEP 2 - CALENDAR FORM */}
      {step === 2 && <CalendarForm selectedSlots={selectedSlots} setStep={setStep} />}

      {/* Hidden gradient defs used by CSS */}
      <svg width="0" height="0" aria-hidden>
        <defs>
          <linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#39ff14" offset="0%" />
            <stop stopColor="#004300" offset="100%" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CustomCalendar;
