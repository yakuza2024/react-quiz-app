export function QuestionCard({ question, number, children }) {
  return (
    <article className="question-card" aria-labelledby="question-title">
      <p className="question-kicker">Question {number}</p>
      <h1 className="question-title" id="question-title">{question.question}</h1>
      <div className="answer-list" role="group" aria-label="Answer choices">
        {children}
      </div>
    </article>
  )
}
