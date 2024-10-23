import { useState } from "react";

const Header = (props) => <h1>{props.name}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

// component that shows the statistics
const Statistics = (props) => {
  if (props.totalFeedback === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="total" value={props.totalFeedback} />
            <StatisticLine text="average" value={props.averageScore} />
            <StatisticLine text="positive" value={props.positivePercentage} />
          </tbody>
        </table>
      </div>
    );
  }
};

// creates the different statistics
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" ? " %" : ""}
      </td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };

  // calculates the total feedback given
  const totalFeedback = good + neutral + bad;
  console.log("total is", totalFeedback);

  // calculates the average feedback score
  const averageScore = totalFeedback > 0 ? (good - bad) / totalFeedback : 0;
  console.log("average is", averageScore);

  // calculates how high the percentage of positive feedback is
  const positivePercentage =
    totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;
  console.log("amount of positive feedback", positivePercentage);

  return (
    <div>
      <Header name="Press a button to give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header name="Feedback Statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedback={totalFeedback}
        averageScore={averageScore}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
