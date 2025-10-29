import { useState } from "react";
import FlashCard from "./components/FlashCard";
import ProgressBar from "./components/ProgressBar";
import Navigation from "./components/Navigation";
import { cards } from "./data/cards";

export default function App() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = cards[index];

  const handleNext = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  const handleFlip = () => setShowAnswer(!showAnswer);

  return (
    <div className="app">
      <h1>JavaScript Flashcards</h1>
      <ProgressBar progress={(index + 1) / cards.length * 100} />
      <FlashCard
        question={currentCard.question}
        answer={currentCard.answer}
        showAnswer={showAnswer}
        onFlip={handleFlip}
      />
      <Navigation
        onNext={handleNext}
        onPrev={handlePrev}
        disableNext={index === cards.length - 1}
        disablePrev={index === 0}
      />
      <p>{index + 1} / {cards.length}</p>
    </div>
  );
}
