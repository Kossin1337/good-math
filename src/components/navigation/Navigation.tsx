import { useState, useEffect } from "react";
import HomeIcon from "../../icons/HomeIcon";
import CtaButton from "../cta-button/CtaButton";
import "./Navigation.scss";
import { motion } from "framer-motion";
import { navFadeFromTop } from "../../animations/motionPresets";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // List of section IDs
  const sections = [
    // { id: "home", label: HomeIcon },
    { id: "about", label: "O mnie" },
    { id: "reviews", label: "Opinie" },
    { id: "prices", label: "Cennik" },
    { id: "contact", label: "Kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      for (const id of sections) {
        const section = document.getElementById(id.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the top of the section is near the top of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(id.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial active section

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      variants={navFadeFromTop({ delay: 0.25 })}
      initial="hidden"
      animate="show"
      className="navigation"
    >
      <a href="#home">
        <h1 className="logo">Good Math</h1>
      </a>

      {/* BURGER BUTTON (visible only on mobile) */}
      <button className={`burger ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navigation-menu ${menuOpen ? "show" : ""}`}>
        {menuOpen && (
          <a href="#home" className="navigation-logo-link" onClick={() => setMenuOpen(false)}>
            <h1 className="logo navigation-logo">Good Math</h1>
          </a>
        )}
        {sections.map(({ id, label }) => (
          <a className={`${id}-link`} key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
            <li
              className={`menu-item ${id}-navigation`}
              style={{
                background:
                  activeSection === id
                    ? "-webkit-linear-gradient(var(--main-special-1), var(--sub-special-1))"
                    : "",
                backgroundClip: activeSection === id ? "text" : "border-box",
                WebkitTextFillColor: activeSection === id ? "transparent" : "inherit",
              }}
            >
              {typeof label === "function" ? <HomeIcon /> : label}
            </li>
          </a>
        ))}

        <CtaButton />
      </ul>
    </motion.nav>
  );
};

export default Navigation;
