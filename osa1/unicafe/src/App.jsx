// Fullstack exercises 1.6 - 1.11

import { useState } from 'react'
import './App.css';

// Component to display one statisticline
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// Component to show all statisticlines
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : ((good - bad) / all).toFixed(2);
  const posPercent = all === 0 ? 0 : ((good / all) * 100).toFixed(2);

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={posPercent + ' %'} />
      </tbody>
    </table>
  )
}

// Component to display one statisticbutton + text on it
const Button = ({handleClick, text, className}) => (
  <button onClick={handleClick} className={className}>{text}</button>
)

// Main component for the state and for rendering other components
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className="container">
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" className="good-btn"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" className="neutral-btn" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" className="bad-btn" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

export default App