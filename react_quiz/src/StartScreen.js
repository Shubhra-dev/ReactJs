function StartScreen({ numOfQues, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To React Quiz</h2>
      <h3>{numOfQues} Question(s) to test your react maestry.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
