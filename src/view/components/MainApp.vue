<script>
// import axios from 'axios';
import { state } from '../../state.js';
export default {
    name: 'MainApp',
    data() {
        return {
            state,
            pages: [],


        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getPage(n) {


            if (n < 25) {
                this.pages = []

                for (let index = 0; index < 4; index++) {
                    this.pages.push(n++)

                }
            }




        },
        prevPage(url) {
            this.state.page--

            this.getPage(this.state.page)
            console.log(url)
            this.state.callApi(url)
        },
        nextPage(url) {
            this.state.page++
            this.getPage(this.state.page)

            console.log(url)
            this.state.callApi(url)
        },
        goToPage(n) {
            this.state.page = n;
            this.getPage(this.state.page)

            const offset = (n - 1) * 50;
            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`
            this.state.callApi(url);

            console.log((n - 1) * 50)
        }

    },
    mounted() {
        this.state.callApi(this.state.url);



        this.getPage(1)



    }

}
</script>

<template>

    <template v-if="this.state.loading">
        <div class="container_loading">
            <div class="loader"></div>
        </div>

    </template>

    <main id="site_main">
        <div class="container_pokemon">

            <div class="row_pokemon" v-if="this.state.loading === false">

                <div class="card" style="width: 150px; height: 140px; " v-for="pokemon in state.pokemons">
                    <router-link :to="{ name: 'showPoke', params: { slug: pokemon.name } }">
                        <div class="number_pokemon">
                            <span v-if="pokemon.id.toString().length == 1">#000{{ pokemon.id }}</span>
                            <span v-if="pokemon.id.toString().length == 2">#00{{ pokemon.id }}</span>
                            <span v-if="pokemon.id.toString().length == 3">#0{{ pokemon.id }}</span>


                        </div>
                        <div class="img_pokemon">
                            <img v-if="pokemon.sprites.other.dream_world.front_default" id="img_poke"
                                :src="pokemon.sprites.other.dream_world.front_default" alt="" class="">
                            <img v-else id="img_poke" :src="pokemon.sprites.other.home.front_default" alt="">
                        </div>
                        <div class="name_pokemon">
                            <span id="name_poke" class="text-dark">
                                {{ this.capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}
                            </span>
                        </div>
                    </router-link>


                </div>
            </div>



            <!-- paginate -->
            <div class="container_paginate" v-if="this.state.prev || this.state.next">
                <div class="button_prev_page" v-if="this.state.prev" @click="prevPage(this.state.prev)">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </div>

                <div class="pages_less_than_four" v>
                    <div class="page" v-for="page in pages" @click="goToPage(page)"
                        :class="[page === this.state.page ? 'active_page' : '']">
                        <span>{{ page }}</span>
                    </div>
                </div>





                <div class="button_next_page" v-if="this.state.next" @click="nextPage(this.state.next)">
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </div>
            </div>

        </div>
    </main>
    <!-- /#site_main -->
</template>

<style></style>