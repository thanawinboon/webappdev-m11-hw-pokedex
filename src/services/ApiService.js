import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/thanawinboon/webappdev-pkm-mockdata',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
  
  getPokemonList() { 
      return apiClient.get('/pokemons')
  },
  getPokemonDetails(id) {
      return apiClient.get('/pokemons/' + id)
  } 
}