function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😀";
  if (percentage >= 0 && percentage < 50) emoji = "😐";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {/* <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%) */}
        جبت <strong>{points}</strong> نقطه من {maxPoints} (
        {Math.ceil(percentage)}%) <span>{emoji}</span>
      </p>

      <p className="highscore">(اعلى نقاط جبته : {highscore} نقطه)</p>
      <button
        className="btn btn-finish"
        onClick={() => dispatch({ type: "restart" })}
      >
        اعد الكويز
      </button>
    </>
  );
}

export default FinishedScreen;
