import { useState } from "react";

const Header = ({ header }) => <h1>{header}</h1>;

// creates the blueprint for an anecdote with its text and votes
const Anecdote = ({ text, voteCount }) => {
  return (
    <div>
      <p>
        {text} Votes: {voteCount}
      </p>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Winner = ({ allVotes, anecdotes }) => {
  // finds the maximum/highest number in the allVotes array
  const mostVotes = Math.max(...allVotes);
  console.log(mostVotes);

  // returns the first index at which a given element can be found in the array
  const highestIndex = allVotes.indexOf(mostVotes);
  console.log(highestIndex);

  // selects the anecdote with the most votes
  const winnerAnecdote = anecdotes[highestIndex];
  console.log(winnerAnecdote);

  if (mostVotes === 0) {
    return <p>There have been no votes so far. Please vote.</p>;
  }
  return (
    <div>
      <p>
        {winnerAnecdote} has the most votes with a total: {mostVotes} votes.
      </p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  // create a state with an array that is as long as the number of anectodes and fills it with zeros
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0));

  // handles the click for the next anecdote that gets selected randomly
  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // handles the click for a vote
  const handleVote = () => {
    const newAllVotes = [...allVotes];
    newAllVotes[selected] += 1;
    setAllVotes(newAllVotes);
  };

  return (
    <div>
      <Header header="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} voteCount={allVotes[selected]} />
      <Button handleClick={handleVote} text={"Vote"} />
      <Button handleClick={handleNextClick} text={"Next Anecdote"} />
      <Header header="Anecdote with most votes" />
      <Winner allVotes={allVotes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
