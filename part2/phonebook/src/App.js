import React from 'react'
import { useState, useEffect } from 'react'
import personService from './services/persons'

import Person from './components/Person'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import AddNotification from './components/AddNotification'
import Error from './components/Error'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
 
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    } 
    const index = persons.findIndex(person => person.name === newName);

    if (index !== -1 ) 
    {
      if (window.confirm("Do you really want to change the number?")) {
        personService.update(persons[index].id, personObject);
        persons[index].number = newNumber;
      }
    } else {
      personService.create(personObject)
      setPersons(persons.concat(personObject))
      setNotifMessage(`${personObject.name} was successfully added to the server`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showFilterOnly = newFilter.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <AddNotification message={notifMessage} />
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add A New</h2>
      <FormPerson addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        { showFilterOnly.map((person) => <Person key={person.id} list={persons} person={person} listModify={setPersons} setErrorMessage={setErrorMessage} />)}
      </ul>
    </div>
  )
}

export default App