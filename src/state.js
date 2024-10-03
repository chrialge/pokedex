
import { reactive } from 'vue'
import axios from 'axios'

export const state = reactive({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=151/',
    pokemons: [],



    callApi() {
        axios.get(this.url).then((response) => {
            for (let index = 0; index < response.data.results.length; index++) {
                const urlPokemon = response.data.results[index].url;

                axios.get(urlPokemon).then((resp) => {

                    this.pokemons.push(resp.data)

                })

            }

        })
    },

    filterPokemon(search) {
        const result = this.pokemons.filter((pokemon) => pokemon.name.includes(search))
        this.pokemons = result;

    }
})

