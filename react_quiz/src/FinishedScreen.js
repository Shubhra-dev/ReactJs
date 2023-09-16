function FinishedScreen({ point, maxPoint, dispatch, highestPoint }) {
  console.log(point, highestPoint);
  return (
    <>
      <p className="result">
        You Scored {point} out of {maxPoint}
      </p>
      <h4>Highest Score: {point > highestPoint ? point : highestPoint}</h4>
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
