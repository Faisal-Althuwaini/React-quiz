import { useState } from "react"; // Import useState

function StartScreen({ numQuestions, dispatch, isFetching }) {
  const [selectedTopic, setSelectedTopic] = useState(null); // State for tracking selected topic

  return (
    <div className="start">
      <h2>اهلاً !</h2>
      <h3>اختار موضوع الكويز واختبر معرفتك 🚀</h3>
      <h3>اختر موضوع:</h3>
      <div className="topic-buttons">
        <button
          className={`btn btn-ui btn-topic ${
            selectedTopic === "el3yal" ? "btn-selected" : ""
          }`}
          onClick={() => {
            setSelectedTopic("el3yal"); // Update selected topic
            dispatch({ type: "selectTopic", payload: "react" });
          }}
        >
          <img src="./react-logo.png" className="icon" alt="logo" />
        </button>
        <button
          className={`btn btn-ui ${
            selectedTopic === "questions" ? "btn-selected" : ""
          }`}
          onClick={() => {
            setSelectedTopic("questions"); // Update selected topic
            dispatch({ type: "selectTopic", payload: "javascript" });
          }}
        >
          <img src="./js-logo.png" className="icon" alt="logo" />
        </button>
      </div>
      {selectedTopic !== null && !isFetching ? ( // Show button only if fetching is not in progress
        <button
          className={`btn btn-ui btn-start ${!isFetching ? "visible" : ""}`} // Apply 'visible' class
          onClick={() => dispatch({ type: "start" })}
        >
          ابدأ الكويز
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default StartScreen;
