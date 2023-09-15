function NextButton({ dispatch, answer, index, numOfQuestion }) {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={
        index < numOfQuestion - 1
          ? () => dispatch({ type: "nextQues" })
          : () => dispatch({ type: "finished" })
      }
    >
      {index < numOfQuestion - 1 ? "Next" : "Finish"}
    </button>
  );
}

export default NextButton;
