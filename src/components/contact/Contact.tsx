import PhoneIcon from "../../icons/PhoneIcon";
import ContactForm from "./ContactForm";
import "./Contact.scss";
import { sectionHeader } from "../../animations/motionPresets";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="full-section contact-section" id="contact">
      <div className="header">
        <motion.h2
          initial="hidden"
          whileInView="show"
          variants={sectionHeader()}
          viewport={{ once: true, amount: 0.25 }}
          className="section-header"
        >
          Kontakt
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={sectionHeader()}
          viewport={{ once: true, amount: 0.25 }}
          className="phone-box"
        >
          <PhoneIcon />
          <h3 className="subsub-heading">+48 601 359 229</h3>
        </motion.div>
      </div>
      <motion.h2
        initial="hidden"
        whileInView="show"
        variants={sectionHeader(0.25)}
        viewport={{ once: true, amount: 0.25 }}
        className="form-header"
      >
        Formularz kontaktowy
      </motion.h2>
      <motion.span
        initial="hidden"
        whileInView="show"
        variants={sectionHeader(2)}
        viewport={{ once: true, amount: 0.25 }}
        className="form-description"
      >
        W razie jakichkolwiek pytań lub wątpliwości ~ jestem do dyspozycji i służę pomocą ;)
      </motion.span>
      <ContactForm />
    </section>
  );
};

export default Contact;
