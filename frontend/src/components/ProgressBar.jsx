export function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100

  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="Quiz progress"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div className="progress-fill" style={{ width: `${percentage}%` }} />
    </div>
  )
}
