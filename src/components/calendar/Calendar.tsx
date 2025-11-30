import React from "react";
import GoogleCalendarEmbed from "./GoogleCalendarEmbed";
import "./Calendar.scss";

const Calendar = () => {
  // const calendarURL = "https://calendar.app.google/ebnv7JrTjYXj8KHMA"
  // const calendarSRC =
  //   "https://calendar.google.com/calendar/appointments/schedules/AcZssZ16kPY0Ncen-XaZZ_JOcfP8X-ISRBnxgsGSKq_4pw4sKXcdrC5pvLLDDqcaJTceestYrJLeij4b?gv=true";
  const calendarSRC_2 =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ16kPY0Ncen-XaZZ_JOcfP8X-ISRBnxgsGSKq_4pw4sKXcdrC5pvLLDDqcaJTceestYrJLeij4b?gv=true&wkst=2&;";

  // showDescription=1
  return (
    <div className="calendar-wrapper">
      <h2 className="calendar-header">Zaplanuj spotkanie</h2>
      <GoogleCalendarEmbed calendarSrc={calendarSRC_2} />
    </div>
  );
};

export default Calendar;
