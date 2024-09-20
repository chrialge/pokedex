<script>
// import axios from 'axios';
import { state } from '../state.js';
export default {
    name: 'MainApp',
    data() {
        return {
            // pokemons: [],
            state,
            pokemons: state.pokemons
        }
    },
    methods: {
        // showPokemon() {
        //     const url = 'https://pokeapi.co/api/v2/pokemon?limit=151/';
        //     let pokemon = []
        //     axios.get(url).then((response) => {

        //         for (let index = 0; index < response.data.results.length; index++) {
        //             const urlPokemon = response.data.results[index].url;

        //             axios.get(urlPokemon).then((resp) => {

        //                 pokemon.push(resp.data)
        //             })

        //         }
        //         console.log(pokemon);
        //         return this.pokemons = pokemon
        //     }).catch(err => {
        //         console.error(err);

        //     })
        // }
    },
    mounted() {
        state.callApi();

    }

}
</script>

<template>
    <main id="site_main">
        <div class="container_pokemon">
            <div class="card col-3" v-for="pokemon in pokemons">
                <div class="number_pokemon">
                    <span v-if="pokemon.id.toString().length == 1">#000{{ pokemon.id }}</span>
                    <span v-if="pokemon.id.toString().length == 2">#00{{ pokemon.id }}</span>
                    <span v-if="pokemon.id.toString().length == 3">#0{{ pokemon.id }}</span>


                </div>
                <div class="img_pokemon">
                    <img id="img_poke" :src="pokemon.sprites.front_default" alt="">
                </div>
                <div class="name_pokemon">
                    <span id="name_poke">{{ pokemon.name }}</span>
                </div>
            </div>
        </div>
    </main>
    <!-- /#site_main -->
</template>

<style></style>