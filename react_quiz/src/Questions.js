function Questions({ dispatch, question, answer }) {
  const isAnswered = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((op, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              isAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={op}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={isAnswered}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
