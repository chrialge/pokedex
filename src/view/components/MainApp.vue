<script>
// import axios from 'axios';
import { state } from '../../state.js';
export default {
    name: 'MainApp',
    data() {
        return {
            state,

        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    mounted() {
        state.callApi();

    }

}
</script>

<template>
    <main id="site_main">
        <div class="container_pokemon">

            <div class="card col-3" v-for="pokemon in state.pokemons">
                <router-link :to="{ name: 'showPoke', params: { slug: pokemon.name } }">
                    <div class="number_pokemon">
                        <span v-if="pokemon.id.toString().length == 1">#000{{ pokemon.id }}</span>
                        <span v-if="pokemon.id.toString().length == 2">#00{{ pokemon.id }}</span>
                        <span v-if="pokemon.id.toString().length == 3">#0{{ pokemon.id }}</span>


                    </div>
                    <div class="img_pokemon">
                        <img v-if="pokemon.sprites.other.dream_world.front_default" id="img_poke"
                            :src="pokemon.sprites.other.dream_world.front_default" alt="">
                        <img v-else id="img_poke" :src="pokemon.sprites.other.home.front_default" alt="">
                    </div>
                    <div class="name_pokemon">
                        <span id="name_poke">{{ capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}</span>
                    </div>
                </router-link>


            </div>
        </div>
    </main>
    <!-- /#site_main -->
</template>

<style></style>