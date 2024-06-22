import { useState, useEffect } from 'react';
import axios from 'axios';

// Component to filter the list of persons
const Filter = ({ filter, filterChangeHandling}) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={filterChangeHandling} />
    </div>
  )
}

// COmponent to add a new person
const ThePerson = ({ addPerson, newName, nameChangeHandling, newNumber, numberChangeHandling}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={nameChangeHandling} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChangeHandling} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

// Component to display the list of persons
const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.id} person={person} />
      )}
    </ul>
  )
}

// Component to display a single person
const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

// The main component
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Effect hook to fetch data from JSON server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching the initial data:', error);
      })
  })

  // Function to handle a new person add
  const addPerson = (event) => {
    event.preventDefault()
    const personToAdd = {
      name: newName,
      number: newNumber,
      id: persons.length ? Math.max(persons.map(person => person.id)) + 1 : 1
    }

    // Check if the person already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in this Phonebook`)
    } else {
      setPersons(persons.concat(personToAdd))
    }
    setNewName('')
    setNewNumber('')
  } 

  const nameChangeHandling = (event) => {
    setNewName(event.target.value)
  }

  const numberChangeHandling = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChangeHandling = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandling={filterChangeHandling} />
      <h3>Add a new</h3>

      <ThePerson
      addPerson={addPerson}
      newName={newName}
      nameChangeHandling={nameChangeHandling}
      newNumber={newNumber}
      numberChangeHandling={numberChangeHandling}
      />

      <h3>Numbers</h3>
      
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
