import Typewriter from "./TypeWriter";
import { ParticlesBG } from "./ParticlesBG";
import CtaButton from "../cta-button/CtaButton";

import LocationIcon from "../../icons/LocationIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import "./Main.scss";
import { motion } from "framer-motion";
import {
  slideIn,
  rightMainSlide,
  slightTextAppear,
  photoAppear,
} from "../../animations/motionPresets";

// import avatar1 from "../../../public/profil.png";
// import avatar2 from "../../../public/profilowe.jpg";

const Main = () => {
  return (
    <section className="main-section" id="home">
      <ParticlesBG />
      {/* <div id="particles-js"></div> */}
      <div className="left-section">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={slightTextAppear(0.5)}
          className="main-heading"
        >
          Wojciech Dobrowolski
        </motion.h1>
        <motion.h2
          initial="hidden"
          animate="show"
          variants={slightTextAppear(1)}
          className="sub-heading sub-heading-one"
        >
          Korepetycje z Matematyki
        </motion.h2>
        <motion.h3
          initial="hidden"
          animate="show"
          variants={slightTextAppear(1.5)}
          className="sub-heading sub-heading-two"
        >
          ONLINE & WARSZAWA
        </motion.h3>
        <CtaButton />
        <motion.div
          initial="hidden"
          animate="show"
          variants={slightTextAppear(2)}
          className="main-item-box-wrapper"
        >
          <div className="main-item-box phone-box">
            <PhoneIcon />
            <h3 className="subsub-heading">+48 601 359 229</h3>
          </div>
          <div className="main-item-box location-box">
            <LocationIcon />
            <h3 className="subsub-heading">ul. Chodecka 1</h3>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={rightMainSlide("right", { delay: 0.5 })}
        className="right-side"
      >
        {/* <h2 className="attribute-title">Wojciech D.</h2> */}
        {/* <img src="bg3.png" alt="Wojciech D. korepetycje matematyka" /> */}
        <motion.img
          initial="hidden"
          animate="show"
          variants={photoAppear({ delay: 0.6 })}
          src="profilowe.jpg"
          alt="Wojciech D. korepetycje matematyka"
        />
        <Typewriter />
        <div className="attributes">
          <h3 className="attribute">Pasjonat Matematyki</h3>
          <h3 className="attribute">10 lat doświadczenia</h3>
        </div>
      </motion.div>
    </section>
  );
};

export default Main;
