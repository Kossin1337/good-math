import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CustomHourPicker.scss";

interface CustomHourPickerProps {
  hour: number;
  setHour: (x: number) => void;
  minute: number;
  setMinute: (x: number) => void;
}

const CustomHourPicker: React.FC<CustomHourPickerProps> = ({
  hour,
  setHour,
  minute,
  setMinute,
}) => {
  const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9–17
  const minutes = [0, 30];

  const changeHour = (direction: "up" | "down") => {
    const currentIndex = hours.indexOf(hour);
    const newIndex =
      direction === "up"
        ? (currentIndex + 1) % hours.length
        : (currentIndex - 1 + hours.length) % hours.length;
    setHour(hours[newIndex]);
    // onTimeSelect?.(hours[newIndex], minute);
  };

  const changeMinute = (direction: "up" | "down") => {
    const currentIndex = minutes.indexOf(minute);
    const newIndex =
      direction === "up"
        ? (currentIndex + 1) % minutes.length
        : (currentIndex - 1 + minutes.length) % minutes.length;
    setMinute(minutes[newIndex]);
    // onTimeSelect?.(hour, minutes[newIndex]);
  };

  const ArrowUp = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );

  const ArrowDown = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  return (
    <div className="custom-hour-picker">
      <div className="picker-container">
        {/* Hour selector */}
        <div className="time-selector">
          <button className="arrow-btn" onClick={() => changeHour("up")}>
            <ArrowUp />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={hour}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="time-value"
            >
              {hour.toString().padStart(2, "0")}
            </motion.div>
          </AnimatePresence>

          <button className="arrow-btn" onClick={() => changeHour("down")}>
            <ArrowDown />
          </button>
        </div>

        {/* Minute selector */}
        <div className="time-selector">
          <button className="arrow-btn" onClick={() => changeMinute("up")}>
            <ArrowUp />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={minute}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="time-value"
            >
              {minute.toString().padStart(2, "0")}
            </motion.div>
          </AnimatePresence>

          <button className="arrow-btn" onClick={() => changeMinute("down")}>
            <ArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomHourPicker;
