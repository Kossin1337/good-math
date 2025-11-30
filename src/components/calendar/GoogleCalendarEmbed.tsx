import React from "react";

interface GoogleCalendarEmbedProps {
  calendarSrc: string; // The calendar src URL from Google
  title?: string;
  h?: string;
}

const GoogleCalendarEmbed: React.FC<GoogleCalendarEmbedProps> = ({
  calendarSrc,
  title = "Google Calendar",
  h = "calc(100vh - 69px)",
}) => {
  return (
    <div style={{ border: 0 }}>
      <iframe
        title={title}
        src={calendarSrc}
        style={{ border: 0, width: "100%", height: h }}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  );
};

export default GoogleCalendarEmbed;
