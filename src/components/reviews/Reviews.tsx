import React, { useEffect, useRef, useState } from "react";
import "./Reviews.scss";
import { sectionHeader, reviewTrack, reviewArrows } from "../../animations/motionPresets";
import { motion } from "framer-motion";

type Review = {
  title: string;
  desc: string;
  level: string;
  name: string;
  additional: string;
};

export const REVIEWS_DATA: Review[] = [
  {
    title: "Mission complete. Zdałem!",
    desc: "Panie Wojtku, mission complete. Zdałem! Dzięki za pomoc – bez Pana by mi się nie udało.",
    level: "Liceum",
    name: "Jerzy G.",
    additional: "Matura | PDST",
  },
  {
    title: "Nie spodziewałem się takiego wyniku",
    desc: "Hejka! Udało się! 88% z rozszerzenia – serio się tego nie spodziewałem. Dzięki za wszystko, bez tych lekcji nie miałbym takiego wyniku!",
    level: "Liceum | ROZ",
    name: "Gabriela W.",
    additional: "Matura | ROZ",
  },
  {
    title: "Kolos na 4.5 i matma zaliczona!",
    desc: "Hejka, u mnie wszystko w porządku 😄 Kolos z matematyki na 4.5! Bez Pana nie byłoby takich wyników – dziękuję za cierpliwość i świetne tłumaczenia.",
    level: "Studia",
    name: "Weronika S.",
    additional: "Studentka ekonomii",
  },
  {
    title: "Pomoc do Matury",
    desc: "Dzięki wieloletniej współpracy z tym nauczycielem, udało mi się solidnie przygotować do matury z matematyki. Jego cierpliwość i indywidualne podejście sprawiły, że nauka stała się przyjemnością, a wyniki znacznie się poprawiły.",
    level: "Liceum | ROZ",
    name: "Jagoda S.",
    additional: "Współpraca wieloletnia",
  },
  {
    title: "Super Tłumaczenia",
    desc: "Po kilku miesiącach regularnej nauki z tym nauczycielem, moje umiejętności językowe znacznie się poprawiły. Tłumaczenia stały się prostsze, a pewność siebie na egzaminach rośnie z każdym spotkaniem.",
    level: "Technikum | PODST+ROZ",
    name: "Mateusz K.",
    additional: "Egzamin maturalny",
  },
  {
    title: "Matematyka przestała być straszna",
    desc: "Na początku byłem przerażona, że nic nie umiem, ale Pan Wojtek wszystko tłumaczył spokojnie i po kolei. 94% z podstawy – dziękuję!",
    level: "Liceum",
    name: "Zuzanna B.",
    additional: "Sesja z matematyki",
  },
  {
    title: "Matematyka przestała być straszna",
    desc: "Na początku liceum byłem totalnie zagubiony — same jedynki i bałem się, że nie ukończę klasy. Już po kilku spotkaniach z Panem Wojtkiem wszystko zaczęło być łatwiejsze. Tłumaczy spokojnie, po ludzku i naprawdę zależy mu, żebym zrozumiał. Teraz, po dwóch latach współpracy, kończę rok z co najmniej trójką i wreszcie nie boję się matmy.",
    level: "Liceum",
    name: "Kamil D.",
    additional: "2-letnia współpraca",
  },
  {
    title: "Matematyka przestała być straszna",
    desc: "Na początku roku miałam 2 z matematyki, a na egzaminie 86%! Bardzo Panu dziękuję!",
    level: "Studia Magisterskie",
    name: "Maja L.",
    additional: "Egzamin 8-klasisty",
  },
  {
    title: "Matematyka przestała być straszna",
    desc: "Jestem mega zadowolona po ostatnim kolokwium bo zdałam na 4 :D Bardzo Panu dziękuję i będę odzywać się w przyszłości po kolejne lekcje!",
    level: "Studia Licencjackie",
    name: "Alicja S.",
    additional: "Krótka współpraca",
  },
];

const Reviews: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [bounceClass, setBounceClass] = useState<"" | "bounce-left" | "bounce-right">("");

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = paused ? "paused" : "running";
    }
  }, [paused]);

  /* === Drag logic === */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    setIsDragging(true);
    setPaused(true);
    setStartX(e.pageX);
    setStartScrollLeft(wrapperRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    const dx = e.pageX - startX;
    // 👇 Slower drag for readability (was 1.2)
    wrapperRef.current.scrollLeft = startScrollLeft - dx * 0.6;
  };

  const endDrag = () => {
    setIsDragging(false);
    setPaused(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!wrapperRef.current) return;
    setIsDragging(true);
    setPaused(true);
    setStartX(e.touches[0].pageX);
    setStartScrollLeft(wrapperRef.current.scrollLeft);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    const dx = e.touches[0].pageX - startX;
    // 👇 Slower touch scroll
    wrapperRef.current.scrollLeft = startScrollLeft - dx * 0.6;
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    setPaused(false);
  };

  /* === Arrow scroll logic === */
  const scrollByFraction = (dir: "left" | "right") => {
    const container = wrapperRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const visibleWidth = container.clientWidth;
    const maxScroll = track.scrollWidth - visibleWidth;
    const scrollStep = visibleWidth / 3; // scroll by one-third of view width

    const target =
      dir === "left"
        ? Math.max(container.scrollLeft - scrollStep, 0)
        : Math.min(container.scrollLeft + scrollStep, maxScroll);

    if (target <= 0) {
      setBounceClass("bounce-left");
      setTimeout(() => setBounceClass(""), 300);
    } else if (target >= maxScroll) {
      setBounceClass("bounce-right");
      setTimeout(() => setBounceClass(""), 300);
    }

    container.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="full-section reviews-section" id="reviews">
      <motion.h2
        initial="hidden"
        whileInView="show"
        variants={sectionHeader()}
        viewport={{ once: true, amount: 0.25 }}
        className="section-header"
      >
        Opinie Uczniów
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        variants={reviewTrack()}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div
          ref={wrapperRef}
          className={`reviews-wrapper is-interactive ${bounceClass}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            endDrag();
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div ref={trackRef} className="reviews-track quick-scroll">
            {REVIEWS_DATA.map((r, i) => (
              <div key={i} className="opinion-box">
                <h2 className="opinion-title">{r.title}</h2>
                <span className="opinion-description">{r.desc}</span>
                <span className="opinion-level">{r.level}</span>
                <div className="opinion-footer">
                  <strong>{r.name}</strong> {r.additional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Neon arrows */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={reviewArrows()}
        viewport={{ once: true, amount: 0.25 }}
        className="reviews-nav"
      >
        <button
          className="arrow neon-arrow left"
          onClick={() => scrollByFraction("left")}
          aria-label="Previous"
        >
          <span>←</span>
        </button>
        <button
          className="arrow neon-arrow right"
          onClick={() => scrollByFraction("right")}
          aria-label="Next"
        >
          <span>→</span>
        </button>
      </motion.div>
    </section>
  );
};

export default Reviews;
