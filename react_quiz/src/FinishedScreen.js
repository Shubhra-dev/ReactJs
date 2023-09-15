function FinishedScreen({ point, maxPoint, dispatch }) {
  return (
    <>
      <p className="result">
        You Scored {point} out of {maxPoint}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        🔄 Restart
      </button>
    </>
  );
}

export default FinishedScreen;
