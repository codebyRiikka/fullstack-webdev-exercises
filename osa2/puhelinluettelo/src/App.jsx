import { useState, useEffect } from 'react';
import personApi from '/src/personApi';
import '/src/index.css';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

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
const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      )}
    </ul>
  )
}

// Component to display a single person
const Person = ({ person, deletePerson }) => {
  return (
    <li>{person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}>Delete</button>
    </li>
  )
}

// The main component
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [NotificationMessage, setNotificationMessage] = useState(null)
  const [NotificationType, setNotificationType] = useState(null)

  // Effect hook to fetch data from JSON server
  useEffect(() => {
    personApi
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
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
    }

    const existingPerson = persons.find(person => person.name === newName);
    // Check if the person already exists, if exists: suggest user if they want to replace old number with the new one
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already in this Phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        personApi
          .update(existingPerson.id, personToAdd)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Updated ${newName}'s number`);
            setNotificationType('edit');
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 5000)
          })
          .catch(error => {
            console.error('Error updating the person:', error);
          })
      }
    } else {
      personApi
        .create(personToAdd)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${newName}`);
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null);
            setNotificationType(null);
        }, 5000)
      })
      .catch(error => {
          console.error('Error adding a new person:', error);
      })
    }
  } 

  // Function to delete person
  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if(window.confirm('Are you sure you want to delete person from phonebook?')) {
      personApi
        .removeData(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(`Deleted ${personToDelete.name}`);
          setNotificationType('deleted')
          setTimeout(() => {
            setNotificationMessage(null);
            setNotificationType(null);
        }, 5000)
      })
      .catch(error => {
        console.error('Error deleting the person:', error);
      })
    }
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
      <Notification message={NotificationMessage} type={NotificationType}/>
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
      
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
