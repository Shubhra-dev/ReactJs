import { useEffect } from "react";

function Timer({ dispatch, secondsRem }) {
  const min = Math.floor(secondsRem / 60);
  const sec = secondsRem % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min > 9 ? min : "0" + min}: {sec > 9 ? sec : "0" + sec}
    </div>
  );
}
export default Timer;
