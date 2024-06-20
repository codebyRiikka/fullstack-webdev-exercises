import { useState } from 'react'

const Filter = ({ filter, filterChangeHandling}) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={filterChangeHandling} />
    </div>
  )
}

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

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-9876543' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personToAdd = {
      name: newName,
      number: newNumber
    }

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
