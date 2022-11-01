import { useState } from 'react'

const StatisticLine = props => <tbody><tr><td>{props.state}:</td><td>{props.value}</td></tr></tbody>

const Header = props => <h1>{props.text}</h1>

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if (!good && !neutral && !bad) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
  <div>
  
  <table>
    <StatisticLine state = "good" value = {good} />
    <StatisticLine state = "neutral" value = {neutral} />
    <StatisticLine state = "bad" value = {bad} />
    <StatisticLine state = "all" value = {good + neutral + bad} />
    <StatisticLine state = "average" value = {(good - bad) / (good + neutral + bad)} />
    <StatisticLine state = "positive" value = {`${good / (good + neutral + bad) * 100} %`} />
  </table>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text = "give feedback" />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Header text = "statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App