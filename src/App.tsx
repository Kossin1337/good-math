import "./App.scss";

import Navigation from "./components/navigation/Navigation";
// import Calendar from "./components/calendar/Calendar";
import Main from "./components/main/Main";
import About from "./components/about/About";
import Reviews from "./components/reviews/Reviews";
import Packets from "./components/packets/Packets";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div className="app-wrapper">
      <Navigation />
      <Main />
      <About />
      <Reviews />
      <Packets />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
