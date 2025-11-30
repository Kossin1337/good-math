import React from "react";
import ReactDOM from "react-dom";
import CustomCalendar from "./CustomCalendar";
import { backdropVariants, modalVariants } from "../../animations/motionPresets";
import { motion, AnimatePresence } from "framer-motion";

import "./CalendarModal.scss";

interface CalendarModalProps {
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="show"
        exit="exit"
        variants={backdropVariants}
        className="calendar-modal-wrapper"
        onClick={onClose}
      >
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={modalVariants}
          className="calendar-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <CustomCalendar onClose={onClose} />
        </motion.div>
        <div className="blur-background"></div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default CalendarModal;
