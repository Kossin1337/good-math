import { useEffect, useRef, useState } from "react";
import MapPointIcon from "../../icons/MapPointIcon";
import CalendarDaysIcon from "../../icons/CalendarDaysIcon";
import BookIcon from "../../icons/BookIcon";
import ChartIcon from "../../icons/ChartIcon";
import AcademicCapIcon from "../../icons/AcademicCapIcon";
import RubicksCubeIcon from "../../icons/RubicksCubeIcon";
import { sectionHeader, packetBox } from "../../animations/motionPresets";
import { motion } from "framer-motion";
import "./Packets.scss";

const Packets = () => {
  /* 👇 NEW: scrolling logic for mobile */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [gap, setGap] = useState(0);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  /* === Calculate item width + gap dynamically === */
  const recalcDimensions = () => {
    const container = wrapperRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(".packet-box"));
    if (items.length === 0) return;

    const first = items[0];
    const computedStyle = window.getComputedStyle(container);
    const gapStr = computedStyle.columnGap || computedStyle.gap || "0px";
    const gapVal = parseFloat(gapStr) || 0;

    setItemWidth(first.offsetWidth);
    setGap(gapVal);
    setCount(items.length);
  };

  /* === Initialize + Observe resizes === */
  useEffect(() => {
    recalcDimensions();

    const resizeObserver = new ResizeObserver(() => recalcDimensions());
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    const handleResize = () => {
      recalcDimensions();
      // Reset scroll to start when entering mobile breakpoint
      if (window.innerWidth < 768 && wrapperRef.current) {
        wrapperRef.current.scrollTo({ left: 0 });
        setIndex(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* === Detect scroll position for arrow state === */
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const handleScroll = () => {
      const fullStep = itemWidth + gap;
      if (fullStep <= 0) return;
      const i = Math.round(container.scrollLeft / fullStep);
      setIndex(Math.max(0, Math.min(i, count - 1)));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [itemWidth, gap, count]);

  /* === Scroll Controls === */
  const scrollToIndex = (target: number) => {
    const container = wrapperRef.current;
    if (!container) return;

    const fullStep = itemWidth + gap;
    const clamped = Math.max(0, Math.min(target, count - 1));
    container.scrollTo({
      left: clamped * fullStep,
      behavior: "smooth",
    });
    setIndex(clamped);
  };

  const scrollLeft = () => scrollToIndex(index - 1);
  const scrollRight = () => scrollToIndex(index + 1);

  return (
    <section className="packets-section" id="prices">
      <motion.h2
        initial="hidden"
        whileInView="show"
        variants={sectionHeader()}
        viewport={{ once: true, amount: 0.25 }}
        className="section-header"
      >
        Cennik dla stałych uczniów
      </motion.h2>
      <motion.span
        initial="hidden"
        whileInView="show"
        variants={sectionHeader(0.5)}
        viewport={{ once: true, amount: 0.25 }}
        className="packets-info"
      >
        <strong>FAQ: TAK!</strong> - Zniżka uwzględnia wszystkie dotychczasowe lekcje
      </motion.span>

      {/* ADD ref here */}
      <div className="packets-wrapper" ref={wrapperRef}>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={packetBox(1)}
          viewport={{ once: true, amount: 0.25 }}
          className="packet-box"
        >
          <div className="packet-headers">
            <h3 className="packet-header">Pojedyńcze Spotkania</h3>
            <h4 className="packet-time-amount">( 1-5 lekcji )</h4>
            <h3 className="packet-discount">120 PLN / H</h3>
          </div>
          <div className="packet-description-wrapper">
            <div className="packet-info">
              <CalendarDaysIcon />
              <span className="packet-description">
                Klient wybiera dzień, godzinę oraz czas trwania lekcji
              </span>
            </div>
            <div className="packet-info">
              <BookIcon />
              <span className="packet-description">Specjalistyczne materiały edukacyjne</span>
            </div>
            <div className="packet-info">
              <ChartIcon />
              <span className="packet-description">Wsparcie w dążaniu do celu</span>
            </div>
            <div className="packet-info">
              <RubicksCubeIcon />
              <span className="packet-description">Indywidualny plan rozwoju i działania</span>
            </div>
            <span className="packet-description"></span>
            <span className="packet-description"></span>
          </div>
          <span className="additional-info">Pierwsza lekcja 80PLN / H</span>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={packetBox(2)}
          viewport={{ once: true, amount: 0.25 }}
          className="packet-box"
        >
          <div className="packet-headers">
            <h3 className="packet-header">Regularne Zajęcia</h3>
            <h4 className="packet-time-amount">( powyżej 5 lekcji )</h4>
            {/* <h4 className="packet-time-amount">{`>= 5 lekcji`}</h4> */}
            <h3 className="packet-discount">110 PLN / H</h3>
          </div>
          <div className="packet-description-wrapper">
            <div className="packet-info">
              <CalendarDaysIcon />
              <span className="packet-description">
                Klient wybiera dni, godziny oraz czas trwania każdej z lekcji
              </span>
            </div>
            <div className="packet-info">
              <BookIcon />
              <span className="packet-description">Specjalistyczne materiały edukacyjne</span>
            </div>
            <div className="packet-info">
              <ChartIcon />
              <span className="packet-description">Wsparcie w dążaniu do celu</span>
            </div>
            <div className="packet-info">
              <RubicksCubeIcon />
              <span className="packet-description">Indywidualny plan rozwoju i działania</span>
            </div>
            <div className="packet-info">
              <AcademicCapIcon />
              <span className="packet-description">Zniżka & systematyczne lekcje</span>
            </div>
            <div className="packet-info">
              <MapPointIcon />
              <span className="packet-description">Wsparcie pozalekcyjne ONLINE</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={packetBox(3)}
          viewport={{ once: true, amount: 0.25 }}
          className="packet-box"
        >
          <div className="packet-headers">
            <h3 className="packet-header">Stały Klient</h3>
            <h4 className="packet-time-amount">( powyżej 10 lekcji )</h4>
            <h3 className="packet-discount">100 PLN / H</h3>
          </div>
          <div className="packet-description-wrapper">
            <div className="packet-info">
              <CalendarDaysIcon />
              <span className="packet-description">
                Klient wybiera dni, godziny oraz czas trwania każdej z lekcji
              </span>
            </div>
            <div className="packet-info">
              <BookIcon />
              <span className="packet-description">Specjalistyczne materiały edukacyjne</span>
            </div>
            <div className="packet-info">
              <ChartIcon />
              <span className="packet-description">Wsparcie w dążaniu do celu</span>
            </div>
            <div className="packet-info">
              <RubicksCubeIcon />
              <span className="packet-description">Indywidualny plan rozwoju i działania</span>
            </div>
            <div className="packet-info">
              <AcademicCapIcon />
              <span className="packet-description">zniżka & systematyczne lekcje</span>
            </div>
            <div className="packet-info">
              <MapPointIcon />
              <span className="packet-description">Wsparcie pozalekcyjne ONLINE</span>
            </div>
          </div>
        </motion.div>
      </div>

      <span className="additional-info"></span>

      {/* 👇 NEW: neon arrows (visible on small screens via CSS) */}
      <div
        className={`packets-arrows ${index === 0 ? "at-start" : ""} ${
          index === count - 1 ? "at-end" : ""
        }`}
      >
        <button className="packet-arrow left" onClick={scrollLeft} aria-label="Poprzedni pakiet">
          ←
        </button>
        <button className="packet-arrow right" onClick={scrollRight} aria-label="Następny pakiet">
          →
        </button>
      </div>
    </section>
  );
};

export default Packets;
