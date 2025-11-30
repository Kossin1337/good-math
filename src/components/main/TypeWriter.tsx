import { useState, useEffect } from "react";
import "./TypeWriter.scss";

const words = ["innowacyjne", "indywidualne", "przemyślane"];

const Typewriter = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing forward
      if (letterIndex < currentWord.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev + currentWord[letterIndex]);
          setLetterIndex((prev) => prev + 1);
        }, 150);
        return () => clearTimeout(timeoutId);
      } else {
        // Pause at end before deleting
        const timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    } else {
      // Deleting
      if (letterIndex > 0) {
        const timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setLetterIndex((prev) => prev - 1);
        }, 100);
        return () => clearTimeout(timeoutId);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [letterIndex, isDeleting, currentWordIndex]);

  return (
    <div className="typewriter">
      <span className="special-text">
        {displayedText}
        {displayedText.length === words[currentWordIndex].length ? "" : "_"}
      </span>
      <span className="sub-text">Podejście</span>
    </div>
  );
};

export default Typewriter;
