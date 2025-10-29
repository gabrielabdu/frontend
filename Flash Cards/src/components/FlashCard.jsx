export default function FlashCard({ question, answer, showAnswer, onFlip }) {
  return (
    <div className="flashcard" onClick={onFlip}>
      {showAnswer ? (
        <div className="answer">{answer}</div>
      ) : (
        <div className="question">{question}</div>
      )}
    </div>
  );
}
