import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: action.payload };
    case "nextQues":
      return {
        ...state,
        points:
          state.questions[state.index].correctOption === state.answer
            ? state.points + state.questions[state.index].points
            : state.points,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        points:
          state.questions[state.index].correctOption === state.answer
            ? state.points + state.questions[state.index].points
            : state.points,
        status: "finish",
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    default:
      throw new Error("Not Known");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numOfQues = state.questions.length;
  const maxPoint = state.questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numOfQues={numOfQues} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              index={state.index}
              numofQuestion={numOfQues}
              answer={state.answer}
              point={state.points}
              maxPoint={maxPoint}
            />
            <Questions
              dispatch={dispatch}
              question={state.questions[state.index]}
              answer={state.answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={state.answer}
              index={state.index}
              numOfQuestion={numOfQues}
            />
          </>
        )}
        {state.status === "finish" && (
          <FinishedScreen
            point={state.points}
            maxPoint={maxPoint}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
