import { useState } from "react";
import "./CtaButton.scss";
import CalendarIcon from "../../icons/CalendarIcon";
import CalendarDaysIcon from "../../icons/CalendarDaysIcon";
import CalendarModal from "../custom_calendar/CalendarModal";
import { motion } from "framer-motion";
import { CTAButtonAppear } from "../../animations/motionPresets";

const CtaButton = () => {
  const [modalActive, setModalActive] = useState(false);
  const toggleModal = () => setModalActive((prev) => !prev);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="show"
        variants={CTAButtonAppear({ delay: 0.5 })}
        className="cta-button-link"
        onClick={toggleModal}
      >
        <button className="button">
          <CalendarDaysIcon />
          <span className="text">Zaplanuj Lekcje</span>
          <div className="icon">
            <CalendarIcon />
          </div>
        </button>
      </motion.div>

      {modalActive && <CalendarModal onClose={toggleModal} />}
    </>
  );
};

export default CtaButton;
