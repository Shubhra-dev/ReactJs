function Progress({ index, numofQuestion, point, maxPoint, answer }) {
  return (
    <header className="progress">
      <progress max={numofQuestion} value={index + Number(answer !== null)} />
      <p>
        Question: <strong>{index + 1}</strong>/{numofQuestion}
      </p>
      <p>
        Points: <strong>{point}</strong>/{maxPoint}
      </p>
    </header>
  );
}

export default Progress;
