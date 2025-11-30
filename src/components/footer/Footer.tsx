import "./Footer.scss";
import { footerFromBottom } from "../../animations/motionPresets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      variants={footerFromBottom({ delay: 0.25 })}
      initial="hidden"
      animate="show"
      className="footer"
    >
      <span>Good Math</span>
      <span>CopyRight Good Math</span>
      <a href="https://www.kossin.dev" target="_blank">
        <span className="dev-tag">Made By Kossin.dev</span>
      </a>
    </motion.footer>
  );
};

export default Footer;
