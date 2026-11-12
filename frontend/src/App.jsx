import { useEffect, useState } from 'react'
import { AnswerOption } from './components/AnswerOption'
import { ProgressBar } from './components/ProgressBar'
import { QuestionCard } from './components/QuestionCard'
import { QuizHeader } from './components/QuizHeader'
import { ResultCard } from './components/ResultCard'
import { questions } from './data/questions'
import './App.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(() => questions.map(() => null))

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  const startQuiz = () => {
    setCurrentQuestion(0)
    setAnswers(questions.map(() => null))
    navigate('/quiz')
  }

  const selectAnswer = (answerIndex) => {
    setAnswers((previous) =>
      previous.map((answer, index) =>
        index === currentQuestion ? answerIndex : answer,
      ),
    )
  }

  const correctAnswers = answers.reduce(
    (total, answer, index) =>
      total + (answer === questions[index].correctAnswer ? 1 : 0),
    0,
  )

  if (path === '/quiz') {
    const question = questions[currentQuestion]
    const selectedAnswer = answers[currentQuestion]

    return (
      <main className="app-shell">
        <QuizHeader onHome={() => navigate('/')} />
        <section className="quiz-layout" aria-label="Quiz">
          <div className="quiz-topline">
            <span className="eyebrow">THE QUICK QUIZ</span>
            <span className="question-count">
              <strong>{String(currentQuestion + 1).padStart(2, '0')}</strong>
              <span> / {String(questions.length).padStart(2, '0')}</span>
            </span>
          </div>
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          <QuestionCard
            question={question}
            number={currentQuestion + 1}
          >
            {question.options.map((option, index) => (
              <AnswerOption
                key={option}
                label={option}
                letter={String.fromCharCode(65 + index)}
                selected={selectedAnswer === index}
                correct={selectedAnswer !== null && index === question.correctAnswer}
                incorrect={selectedAnswer === index && index !== question.correctAnswer}
                disabled={selectedAnswer !== null}
                onClick={() => selectAnswer(index)}
              />
            ))}
          </QuestionCard>
          {selectedAnswer !== null && (
            <p
              className={`answer-feedback ${selectedAnswer === question.correctAnswer ? 'is-correct' : 'is-incorrect'}`}
              role="status"
            >
              {selectedAnswer === question.correctAnswer
                ? 'That’s right! Nice one.'
                : `Not quite. The answer is ${question.options[question.correctAnswer]}.`}
            </p>
          )}
          <div className="quiz-navigation">
            <button
              className="button button-quiet"
              type="button"
              onClick={() => setCurrentQuestion((current) => current - 1)}
              disabled={currentQuestion === 0}
            >
              <span aria-hidden="true">←</span> Previous
            </button>
            <button
              className="button button-primary"
              type="button"
              onClick={() => {
                if (currentQuestion === questions.length - 1) {
                  navigate('/results')
                } else {
                  setCurrentQuestion((current) => current + 1)
                }
              }}
              disabled={selectedAnswer === null}
            >
              {currentQuestion === questions.length - 1
                ? 'See my results'
                : 'Next question'}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
        <p className="page-note">Take your time. You’ve got this.</p>
      </main>
    )
  }

  if (path === '/results' && answers.every((answer) => answer !== null)) {
    return (
      <main className="app-shell">
        <QuizHeader onHome={() => navigate('/')} />
        <ResultCard
          total={questions.length}
          correct={correctAnswers}
          onRetake={startQuiz}
          onHome={() => navigate('/')}
        />
      </main>
    )
  }

  return (
    <main className="app-shell home-shell">
      <QuizHeader />
      <section className="home-content">
        <div className="hero-copy">
          <span className="eyebrow">A LITTLE CHALLENGE, A LOT OF FUN</span>
          <h1>
            How curious
            <br />
            are <span>you?</span>
          </h1>
          <p>
            Ten questions from all corners of general knowledge. Take a moment,
            trust your instincts, and see what you know.
          </p>
          <button className="button button-primary start-button" onClick={startQuiz}>
            Start the quiz <span aria-hidden="true">→</span>
          </button>
          <div className="quiz-facts">
            <span><strong>10</strong> questions</span>
            <span className="fact-divider" aria-hidden="true" />
            <span><strong>~3</strong> minutes</span>
            <span className="fact-divider" aria-hidden="true" />
            <span><strong>1</strong> good time</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-sticker sticker-star">✳</div>
          <div className="art-sticker sticker-plus">+</div>
          <div className="art-card">
            <div className="art-card-top">
              <span>YOUR DAILY DOSE</span>
              <span className="art-dots">•••</span>
            </div>
            <div className="art-question-mark">?</div>
            <div className="art-card-caption">
              <span>Curiosity</span>
              <span>looks good on you.</span>
            </div>
          </div>
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-caption">a quiz for your curious mind <span>↗</span></div>
        </div>
      </section>
      <footer className="home-footer">
        <span>MADE FOR THE LOVE OF LEARNING</span>
        <span>NO PRESSURE. JUST PLAY.</span>
      </footer>
    </main>
  )
}

export default App
