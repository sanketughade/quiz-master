import { useState } from 'react';

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    choices: ['London', 'Paris', 'Berlin', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    question: 'Who painted the Mona Lisa?',
    choices: [
      'Leonardo da Vinci',
      'Pablo Picasso',
      'Vincent van Gogh',
      'Claude Monet',
    ],
    correctAnswer: 'Leonardo da Vinci',
  },
  {
    question: 'What is the chemical symbol for water?',
    choices: ['H2O', 'CO2', 'NaCl', 'O2'],
    correctAnswer: 'H2O',
  },
  {
    question: 'What is the tallest mammal?',
    choices: ['Elephant', 'Giraffe', 'Hippopotamus', 'Rhino'],
    correctAnswer: 'Giraffe',
  },
  {
    question: 'What year did the Titanic sink?',
    choices: ['1912', '1906', '1921', '1935'],
    correctAnswer: '1912',
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    choices: [
      'Harper Lee',
      'Ernest Hemingway',
      'F. Scott Fitzgerald',
      'Mark Twain',
    ],
    correctAnswer: 'Harper Lee',
  },
  {
    question: 'What is the largest ocean in the world?',
    choices: [
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
      'Pacific Ocean',
    ],
    correctAnswer: 'Pacific Ocean',
  },
  {
    question: 'Which country is known as the Land of the Rising Sun?',
    choices: ['China', 'Japan', 'South Korea', 'Vietnam'],
    correctAnswer: 'Japan',
  },
  {
    question: 'Who was the first man to walk on the moon?',
    choices: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'],
    correctAnswer: 'Neil Armstrong',
  },
];

export default function App() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  function handleOptionClick(selectedAnswer, correctAnswer) {
    setSelectedOption(selectedAnswer);
    setShowFeedback(true);

    if (selectedAnswer === correctAnswer) {
      setScore((curScore) => curScore + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentQuestionNumber < quizQuestions.length - 1) {
        setCurrentQuestionNumber(
          (prevQuestionNumber) => prevQuestionNumber + 1
        );
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  }

  function handleRestartQuiz() {
    setCurrentQuestionNumber(0);
    setScore(0);
    setQuizCompleted(false);
  }

  return (
    <div className="app">
      <Header currentQuestionNumber={currentQuestionNumber} score={score} />
      <Question currentQuestionNumber={currentQuestionNumber} />
      <Options
        currentQuestionNumber={currentQuestionNumber}
        showFeedback={showFeedback}
        selectedOption={selectedOption}
        onOptionClick={handleOptionClick}
      />
      {quizCompleted && (
        <Modal score={score} onRestartQuiz={handleRestartQuiz} />
      )}
    </div>
  );
}

function Header({ currentQuestionNumber, score }) {
  return (
    <div className="header">
      <div className="vertical-flex-container question-progress">
        <p>
          Question {currentQuestionNumber + 1}/{quizQuestions.length}
        </p>
        <div className="question-progress-bar">
          <div
            className="progress-loaded"
            style={{
              width: `${
                ((currentQuestionNumber + 1) / quizQuestions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="vertical-flex-container score">
        <p>Score</p>
        <p className="score-text">{score}</p>
      </div>
    </div>
  );
}

function Question({ currentQuestionNumber }) {
  return (
    <p className="question-text">
      {quizQuestions[currentQuestionNumber].question}
    </p>
  );
}

function Options({
  currentQuestionNumber,
  showFeedback,
  selectedOption,
  onOptionClick,
}) {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <ul className="options">
      {quizQuestions[currentQuestionNumber].choices.map((choice, i) => (
        <li
          className={`option ${
            showFeedback &&
            (selectedOption === choice
              ? choice === quizQuestions[currentQuestionNumber].correctAnswer
                ? 'correct'
                : 'incorrect'
              : choice === quizQuestions[currentQuestionNumber].correctAnswer
              ? 'correct'
              : '')
          }`}
          key={i}
        >
          <Option
            option={{
              id: letters[i],
              label: choice,
            }}
            correctAnswer={quizQuestions[currentQuestionNumber].correctAnswer}
            disabled={showFeedback}
            onOptionClick={() =>
              onOptionClick(
                choice,
                quizQuestions[currentQuestionNumber].correctAnswer
              )
            }
          />
        </li>
      ))}
    </ul>
  );
}

function Option({ option, correctAnswer, disabled, onOptionClick }) {
  return (
    <button
      className={`option-btn ${disabled ? 'disabled' : ''}`}
      onClick={onOptionClick}
      disabled={disabled}
    >
      <div className="option-id">
        <span className="option-id-text">{option.id}</span>
      </div>
      <span className="option-label">{option.label}</span>
    </button>
  );
}

function Modal({ score, onRestartQuiz }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Quiz Completed!</h2>
        <p>Your score: {score}</p>
        <button onClick={onRestartQuiz}>Restart Quiz</button>
      </div>
    </div>
  );
}
