function NextQuestion({ dispatch, answer, numQuestions, index }) {
  if (answer === null) {
    return null;
  }
  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          التالي
        </button>
      </div>
    );

  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          انهاء
        </button>
      </div>
    );
}

export default NextQuestion;
