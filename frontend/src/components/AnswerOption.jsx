export function AnswerOption({
  label,
  letter,
  selected,
  correct,
  incorrect,
  disabled,
  onClick,
}) {
  const classNames = [
    'answer-option',
    selected && 'is-selected',
    correct && 'is-correct',
    incorrect && 'is-incorrect',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classNames}
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="answer-letter">{letter}</span>
      <span className="answer-label">{label}</span>
      {correct && <span className="answer-indicator" aria-label="Correct answer">✓</span>}
      {incorrect && <span className="answer-indicator" aria-label="Incorrect answer">×</span>}
    </button>
  )
}
