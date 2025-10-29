export default function Navigation({ onNext, onPrev, disableNext, disablePrev }) {
  return (
    <div className="navigation">
      <button onClick={onPrev} disabled={disablePrev}>Previous</button>
      <button onClick={onNext} disabled={disableNext}>Next</button>
    </div>
  );
}
