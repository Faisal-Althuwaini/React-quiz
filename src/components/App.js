import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "ready", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  selectedTopic: null,
  isFetching: false, // Track fetching status
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        isFetching: false,
      }; // Update isFetching
    case "dataFailed":
      return { ...state, status: "error", isFetching: false }; // Update isFetching
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "selectTopic":
      return {
        ...state,
        selectedTopic: action.payload,
        isFetching: true,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      selectedTopic,
      isFetching,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      if (selectedTopic) {
        dispatch({ type: "selectTopic", payload: selectedTopic }); // Start fetching
        fetch(`https://questions-1.onrender.com/${selectedTopic}`)
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch((err) => dispatch({ type: "dataFailed" }));
      }
    },
    [selectedTopic]
  );

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            dispatch={dispatch}
            numQuestions={numQuestions}
            isFetching={isFetching}
          /> // Pass isFetching to StartScreen
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>

      <footer id="footer">
        Developed by : <strong>Faisal althuwaini</strong>
      </footer>
    </div>
  );
}

export default App;
