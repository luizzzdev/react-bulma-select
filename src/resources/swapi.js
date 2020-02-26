import axios from 'axios'

const swapi = axios.create({
  baseURL: 'https://swapi.co/api'
})

const fetchPeople = async (name) => {
  const params = {
    search: name
  }

  return (await swapi.get('/people', { params })).data
}

export {
  fetchPeople
}