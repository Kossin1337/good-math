import "./About.scss";
import { motion } from "framer-motion";
import {
  sectionHeader,
  AboutHeaderAppear,
  AboutDescriptionAppear,
  sequentialTextAppear,
} from "../../animations/motionPresets";

const About = () => {
  return (
    <section className="about-section" id="about">
      <motion.h2
        initial="hidden"
        whileInView="show"
        variants={sectionHeader()}
        viewport={{ once: true, amount: 0.25 }}
        className="section-header"
      >
        O mnie
      </motion.h2>

      <div className="about-info-box">
        <motion.h3
          initial="hidden"
          whileInView="show"
          variants={AboutHeaderAppear()}
          viewport={{ once: true, amount: 0.25 }}
          className="sub-heading"
        >
          Kim jestem?
        </motion.h3>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={AboutDescriptionAppear()}
          viewport={{ once: true, amount: 0.25 }}
          className="about-description"
        >
          <b>Cześć! Mam na imię Wojtek</b> i od dziecka pomagam uczniom odkrywać, że matematyka
          naprawdę może być zrozumiała. Od zawsze fascynowały mnie liczby i logiczne myślenie –
          dlatego dziś łączę tę pasję z doświadczeniem, pomagając uczniom przygotować się do matur,
          egzaminów i zaliczeń. Co więcej mój tata to czynny nauczyciel matematyki w prestiżowym
          liceum im. Hetmana Jana Tarnowskiego w Tarnobrzegu, które sam ukończyłem. Przygotował
          wielu laureatów Olimpiady Matematycznej oraz Lingwistyki Matematycznej. Dzięki zajęciom z
          nim od małego przyswoiłem różne metody nauczania, które następnie doszlifowałem podczas
          udzielania korepetycji przez wiele lat.
        </motion.span>
      </div>

      <div className="goals-box">
        <motion.h3
          initial="hidden"
          whileInView="show"
          variants={AboutHeaderAppear()}
          viewport={{ once: true, amount: 0.25 }}
          className="sub-heading"
        >
          Osiągnięcia
        </motion.h3>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={AboutDescriptionAppear()}
          viewport={{ once: true, amount: 0.25 }}
          className="about-description"
        >
          <b>Jestem absolwentem Szkoły Głównej Handlowej w Warszawie</b> na kierunku Metody
          Ilościowe w Ekonomii i Systemy Informacyjne. Na swoim koncie mam m.in. udział w
          Olimpiadzie Matematycznej, tytuły laureata w wielu wojewódzkich konkursach matematycznych,
          wielokrotne wyróżnienia i bardzo dobre wyniki w Kangurze Matematycznym oraz matury z
          matematyki zdane na 100%. Dziś wykorzystuję to doświadczenie, by uczyć skutecznie,
          spokojnie i zrozumiale.
        </motion.span>
      </div>
      <div className="goals-box">
        <motion.h3
          initial="hidden"
          whileInView="show"
          variants={AboutHeaderAppear()}
          viewport={{ once: true, amount: 0.25 }}
          className="sub-heading"
        >
          Wyniki
        </motion.h3>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(1)}
          viewport={{ once: true, amount: 0.25 }}
          className="goal-text"
        >
          <b>Skuteczność potwierdzona wynikami </b>– jeszcze nie zdarzyło się, by uczeń, którego
          przygotowywałem, nie zdał egzaminu. W większości przypadków ich wyniki przekraczają
          oczekiwania
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(2)}
          viewport={{ once: true, amount: 0.25 }}
          className="goal-text"
        >
          <b>Ogromna cierpliwość</b> – potrafię tłumaczyć spokojnie i na wiele sposobów, aż do
          pełnego zrozumienia tematu.
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(3)}
          viewport={{ once: true, amount: 0.25 }}
          className="goal-text"
        >
          <b>Autorskie opracowania i materiały</b> – tworzę własne zestawy zadań, arkusze maturalne
          i notatki ułatwiające naukę.
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(4)}
          viewport={{ once: true, amount: 0.25 }}
          className="goal-text"
        >
          <b>Niekonwencjonalny sposób przekazywania wiedzy</b> – zamiast suchej teorii stawiam na
          przykłady, skojarzenia i logiczne wytłumaczenia.
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(5)}
          viewport={{ once: true, amount: 0.25 }}
          className="goal-text"
        >
          <b>Poczucie humoru i przyjazna atmosfera</b> – bo nauka matematyki naprawdę może być
          przyjemna.
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(6)}
          viewport={{ once: true, amount: 0.25 }}
          className="goal-text"
        >
          <b>
            Doświadczenie w pracy z uczniami ze specjalnymi potrzebami edukacyjnymi, w tym osobami w
            spektrum autyzmu i z dysleksją.
          </b>
        </motion.span>
      </div>

      <div className="material-range-box">
        <motion.h3
          initial="hidden"
          // animate="show"
          whileInView="show"
          variants={AboutHeaderAppear()}
          viewport={{ once: true, amount: 0.25 }}
          className="sub-heading"
        >
          Zakres
        </motion.h3>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(1)}
          viewport={{ once: true, amount: 0.25 }}
        >
          Szkoła Podstawowa | Klasy 6-8
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(2)}
          viewport={{ once: true, amount: 0.25 }}
        >
          Szkoła Średnia | Podstawa + Rozszerzenie
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="show"
          variants={sequentialTextAppear(3)}
          viewport={{ once: true, amount: 0.25 }}
        >
          Studia I stopnia
        </motion.span>
      </div>
    </section>
  );
};

export default About;
