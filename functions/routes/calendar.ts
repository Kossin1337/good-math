import { Router } from "express";
import type { Request, Response } from "express";
import { getFreeBusyForDateV2, calendarId } from "./calendarClient";

const router = Router();

router.get(
  "/freebusy",
  async (
    req: Request,
    res: Response<Array<{ start: string; end: string }> | { error: string }>
  ) => {
    try {
      const date = String(req.query.date); // "YYYY-MM-DD"

      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      console.log("Querying calendarId:", calendarId);

      const busy = await getFreeBusyForDateV2(date);
      console.log("FREEBUSY RESULT:", busy);

      // const busyRanges = analyzeBusy(busy)
      // console.log("analyzeBusy -> busyRanges: ", busy)

      res.json(busy);
    } catch (err) {
      console.error("Free/busy backend error:", err);
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  }
);

// router.get("/events", async (req: Request, res: Response) => {
//   try {
//     const date = String(req.query.date); // "YYYY-MM-DD"
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
//       return res.status(400).json({ error: "Invalid date format" });
//     }

//     const items = await listEventsForDate(date);
//     console.log("/events -> items: ", items)
//     return res.json(items);
//   } catch (err) {
//     console.error("Events.list backend error:", err);
//     const message = err instanceof Error ? err.message : "Unknown error";
//     return res.status(500).json({ error: message });
//   }
// });




// function analyzeBusy(busy: { start: string; end: string }[]) {
//   if (!busy.length) {
//     return {
//       dayStartHour: 9,   // your default
//       dayEndHour: 20,
//       unavailable: [],
//     };
//   }

//   const starts = busy.map(b => new Date(b.start));
//   const ends   = busy.map(b => new Date(b.end));

//   const earliest = new Date(Math.min(...starts.map(d => d.getTime())));
//   const latest   = new Date(Math.max(...ends.map(d => d.getTime())));

//   const dayStartHour = earliest.getHours();
//   const dayEndHour   = latest.getHours();

//   const unavailable = busy.map(b => ({
//     start: new Date(b.start),
//     end: new Date(b.end),
//   }));

//   return { dayStartHour, dayEndHour, unavailable };
// }

export default router;