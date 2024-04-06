export default function App() {
  return (
    <div className="app">
      <Header />
      <Question />
      <Options />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="vertical-flex-container question-progress">
        <p>Question 1/5</p>
        <div className="question-progress-bar">
          <div className="progress-loaded"></div>
        </div>
      </div>
      <div className="vertical-flex-container score">
        <p>Score</p>
        <p className="bold-font">0</p>
      </div>
    </div>
  );
}

function Question() {
  return (
    <p className="question-text">In web design what does CSS stand for?</p>
  );
}

function Options() {
  return (
    <ul className="options">
      <li className="option">
        <Option option={{ id: 'A', label: 'Counter Strike: Source' }} />
      </li>
      <li className="option">
        <Option option={{ id: 'B', label: 'Corrective Style Sheet' }} />
      </li>
      <li className="option">
        <Option option={{ id: 'C', label: 'Computer Style Sheet' }} />
      </li>
      <li className="option">
        <Option option={{ id: 'D', label: 'Cascading Style Sheet' }} />
      </li>
    </ul>
  );
}

function Option({ option }) {
  return (
    <button className="option-btn">
      <div className="option-id">
        <span className="option-id-text">{option.id}</span>
      </div>
      <span className="option-label">{option.label}</span>
    </button>
  );
}
