import axios from 'axios'
const baseUrl = 'https://whispering-shelf-60445.herokuapp.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id, name, setErrorMessage) => {
    const request = axios.delete(`${baseUrl}/${id}`).then(response => response.data).catch(error => {
        console.log('check')
        setErrorMessage(
          `Person '${name}' was already removed from server`
        )
        setTimeout(() => setErrorMessage(''), 5000)
    })
    return request
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, {name: person.name, number: person.number})
    return request.then(response => response.data)
}

export default {create, getAll, deletePerson, update}