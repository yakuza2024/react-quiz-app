export function ResultCard({ total, correct, onRetake, onHome }) {
  const incorrect = total - correct
  const percentage = Math.round((correct / total) * 100)
  const message =
    percentage === 100
      ? 'A perfect score. You know your stuff!'
      : percentage >= 70
        ? 'Nicely done. Your curiosity paid off!'
        : percentage >= 40
          ? 'A solid start. There’s always more to discover!'
          : 'Every great mind starts with a question. Keep going!'

  return (
    <section className="result-content" aria-labelledby="result-title">
      <div className="result-card">
        <div className="result-spark" aria-hidden="true">✳</div>
        <span className="eyebrow">QUIZ COMPLETE</span>
        <h1 id="result-title">Look at you go!</h1>
        <p className="result-intro">{message}</p>
        <div className="score-display" aria-label={`Final score: ${percentage} percent`}>
          <strong className="score-value">{percentage}%</strong>
          <span className="score-caption">Your score</span>
        </div>
        <div className="result-stats">
          <div className="result-stat">
            <strong>{total}</strong>
            <span>Total questions</span>
          </div>
          <div className="result-stat">
            <strong>{correct}</strong>
            <span>Correct answers</span>
          </div>
          <div className="result-stat">
            <strong>{incorrect}</strong>
            <span>Incorrect answers</span>
          </div>
        </div>
        <div className="result-actions">
          <button className="button button-primary" type="button" onClick={onRetake}>
            Retake quiz <span aria-hidden="true">↻</span>
          </button>
          <button className="button button-outline" type="button" onClick={onHome}>
            Return home
          </button>
        </div>
      </div>
    </section>
  )
}
