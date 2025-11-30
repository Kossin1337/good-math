import { google } from "googleapis";
import type { calendar_v3 } from "googleapis";
import { JWT } from "google-auth-library";

const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const private_key_raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
export const calendarId = process.env.GOOGLE_CALENDAR_ID;

console.log("CLIENT_EMAIL:", client_email ? "set" : "MISSING");
console.log("PRIVATE_KEY length:", private_key_raw?.length ?? 0);
console.log("CALENDAR_ID length:", calendarId?.length ?? 0);

if (!client_email || !private_key_raw) {
  throw new Error(
    "GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY missing"
  );
}



const privateKey = private_key_raw.replace(/\\n/g, "\n").trim();

// If your key is stored with escaped \n in the env var, fix them:
// const private_key = private_key_raw.replace(/\\n/g, "\n");

const auth = new JWT({
  email: client_email,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/calendar.readonly","https://www.googleapis.com/auth/calendar.settings.readonly",],
});

export const calendar: calendar_v3.Calendar = google.calendar({
  version: "v3",
  auth,
});

export async function getFreeBusyForDateV2(dateISO: string) {
  const timeMin = `${dateISO}T00:00:00+01:00`;
  const timeMax = `${dateISO}T23:59:59+01:00`;
  // const timeMin = `${dateISO}T00:00:00`;
  // const timeMax = `${dateISO}T23:59:59`;

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: "Europe/Warsaw",
      items: [{ id: calendarId }], // ✅ CHANGED (not "primary")
    },
  });

  console.log("FREEBUSY RAW:", JSON.stringify(res.data, null, 2));

  if (!calendarId) throw new Error("GOOGLE_CALENDAR_ID missing");

  const entry = res.data.calendars?.[calendarId];
  console.log("FREEBUSY ENTRY:", entry);

  // const busy = res.data.calendars?.[calendarId]?.busy ?? []; // ✅ CHANGED
  const calendarsMap = res.data.calendars ?? {};
  const busy = calendarsMap[calendarId]?.busy ?? [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return busy.map((b: any) => ({
    start: String(b.start),
    end: String(b.end),
  }));
}

// export async function listEventsForDate(dateISO: string) {
//   if (!calendarId) throw new Error("GOOGLE_CALENDAR_ID missing");

//   const timeMin = `${dateISO}T00:00:00+01:00`;
//   const timeMax = `${dateISO}T23:59:59+01:00`;

//   const res = await calendar.events.list({
//     calendarId,
//     timeMin,
//     timeMax,
//     singleEvents: true,     // expands recurring events
//     orderBy: "startTime",   // needs singleEvents=true
//     timeZone: "Europe/Warsaw",
//   });

//   return res.data.items ?? [];
// }


// export async function getFreeBusyForDate(dateISO: string) {
//   const timeMin = `${dateISO}T00:00:00+01:00`;
//   const timeMax = `${dateISO}T23:59:59+01:00`;

//   const res = await calendar.freebusy.query({
//     requestBody: {
//       timeMin,
//       timeMax,
//       timeZone: "Europe/Warsaw",
//       items: [{ id: calendarId }],
//     },
//   });

//   const fb: calendar_v3.Schema$FreeBusyResponse | undefined = res.data;
//   const busy = fb?.calendars?.primary?.busy ?? [];

//   return busy.map((b: any) => ({
//     start: String(b.start),
//     end: String(b.end),
//   }));
// }


// import { google } from "googleapis";
// import type { calendar_v3 } from "googleapis";
// import { JWT } from "google-auth-library";

// const creds = {
//   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
//   private_key: process.env.GOOGLE_PRIVATE_ERVICE_ACCOUNT_JSON
// };

// console.log("CREDS:", creds)
// // const creds = {
// //   client_email: import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_JSON,
// //   private_key: import.meta.env.VITE_GOOGLE_PRIVATE_ERVICE_ACCOUNT_JSON
// // };

// if (!creds.client_email || !creds.private_key) {
//   throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY missing");
// }

// const auth = new JWT({
//   email: creds.client_email,
//   key: creds.private_key,
//   scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
// });

// export const calendar: calendar_v3.Calendar = google.calendar({
//   version: "v3",
//   auth,
// });


// /* GET FREEBUSY QUERIES */
// export async function getFreeBusyForDate(dateISO: string) {
//   const timeMin = `${dateISO}T00:00:00+01:00`;
//   const timeMax = `${dateISO}T23:59:59+01:00`;

//   const res = await calendar.freebusy.query({
//     requestBody: {
//       timeMin,
//       timeMax,
//       timeZone: "Europe/Warsaw",
//       items: [{id: "primary"}],
//     },
//   });

//   const fb: calendar_v3.Schema$FreeBusyResponse | undefined = res.data;
//   const busy = fb?.calendars?.primary?.busy ?? [];

//   return busy.map((b) => ({
//     start: String(b.start),
//     end: String(b.end),
//   }));
// }