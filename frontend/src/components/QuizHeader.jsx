export function QuizHeader({ onHome }) {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="/"
        onClick={(event) => {
          if (onHome) {
            event.preventDefault()
            onHome()
          }
        }}
      >
        <span className="brand-mark" aria-hidden="true">?</span>
        <span>Curio Club</span>
      </a>
      {onHome ? (
        <button className="header-home" type="button" onClick={onHome}>
          Exit quiz
        </button>
      ) : (
        <span className="header-note">GOOD QUESTIONS. GOOD VIBES.</span>
      )}
    </header>
  )
}
