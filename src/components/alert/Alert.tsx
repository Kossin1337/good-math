import { slideIn } from "../../animations/motionPresets";
import { motion, AnimatePresence } from "framer-motion";

import "./Alert.scss";

const Alert = (text: string, type: string) => {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="show"
        exit="exit"
        variants={slideIn("right")}
        className="alert-wrapper"
      >
        <div className="alert-content">
          <h3 className={`alert-text ${type}`}>{text}</h3>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
