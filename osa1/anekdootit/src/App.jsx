import { useState } from 'react'

// The button component
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

// Main component
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // Function which raffles random anecdotes index and sets it as selected
  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  // Function to increase the selected anecdotes vote count and update the votes
  const voteAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostVoted = Math.max(...votes); // Highest value from votes array using 'Math.max' function and spread '. . .' -syntax
  const mostVotedIndex = votes.indexOf(mostVoted); // Finds the mostVoted value index by using 'indexOf' -method
  const mostVotedAnecdote = anecdotes[mostVotedIndex]; // Finds the anecdote which has most votes from the anecdotes array

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={randomAnecdote} text="Next Anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{mostVotedAnecdote}</p>
      <p>Has {mostVoted} votes</p>
    </div>
  )
}

export default App