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

        /**
         * funzione che ritorna una stringa con la prima lettera in maiuscolo
         * @param string 
         */
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        /**
         * funzione che inserira le pagine le pagine nel paginate
         * @param n passa un numero che sarebbe la pagina corrente
         */
        getPage(n) {

            //se il parametro passato e minore di 24
            if (n < 24) {

                // svuolto le pagine
                this.pages = []

                // itero per 4 volte
                for (let index = 0; index < 4; index++) {

                    // pusho la pagina con un incremento di 1 per ogni ciclo
                    this.pages.push(n++)
                }
            } else {

                // svuoto le pagine
                this.pages = []

                // prendo il numero della pagina in cui deve iniziare
                let checkPage = this.state.countPage - 3;

                // itero per 4 volte
                for (let index = 0; index < 4; index++) {

                    // pusho la pagina incrementata
                    this.pages.push(checkPage++)
                }
            }
        },

        /**
         * funzione che mi manda alla pagina precedente
         * @param url passo url per prendere i risultati di quella pagina
         */
        prevPage(url) {

            //se e l'ultima pagina
            if (this.state.page === this.state.countPage) {

                // splitto url
                const split = url.split('&');

                // splitto il parametro offset
                let offset = split[0].split('=');

                // splitto il parametro limit
                let limit = split[1].split('=');

                // cambio valore di offset
                offset[1] = 1250;

                // cambio il valore di limit
                limit[1] = 50;

                // unisco offset
                offset = offset.join("=");

                // unisco limit
                limit = limit.join('=');

                // compongo l'url
                const link = offset + '&' + limit

                // diminuisco page
                this.state.page--

                // invoco la funziopne page passando la pagina 
                this.getPage(this.state.page)

                // chiamata api passando il link composto
                this.state.callApi(link)
            } else {

                // diminuisco page
                this.state.page--

                // invoco la funzione page passando la pagina
                this.getPage(this.state.page)

                // chiamata api passando il parametro della funzione
                this.state.callApi(url)
            }
        },
        /**
         * funzione che mi manda alla pagina segguente
         * @param url passso url che mi da i risultati di quella pagina
         */
        nextPage(url) {
            this.state.page++
            this.getPage(this.state.page)

            console.log(url)
            this.state.callApi(url)
        },

        /**
         * funzione che mi manda alla pagina selezionata
         * @param n il numero della pagina
         */
        goToPage(n) {

            // salvo il njumero della pagina
            this.state.page = n;

            // invoco la funzione e passo la pagina scelta
            this.getPage(this.state.page)

            // setto il parametro offset
            const offset = (n - 1) * 50;

            // setto url
            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`

            // chiamata api per la apgina selezionata
            this.state.callApi(url);
        }

    },
    mounted() {

        // se la pagina e maggiore di uno
        if (this.state.page > 1) {

            // invoco la funzione e passo la pagina corrente
            this.goToPage(this.state.page)
        } else {
            // faccio la chiamata api che mi da i risultati per la prima pagina
            this.state.callApi(this.state.url);

            // invoco la funzione per il paginate della prima pagina
            this.getPage(1)
        }


    }

}
</script>

<template>

    <!-- loading page-->
    <template v-if="this.state.loading">
        <div class="container_loading">
            <div class="loader"></div>
        </div>

    </template>

    <!-- main -->
    <main id="site_main">

        <!-- container -->
        <div class="container_pokemon">

            <!-- riga/righe delle card dei pokemon -->
            <div class="row_pokemon" v-if="this.state.loading === false">

                <!-- card pokemon -->
                <div class="card" style="width: 150px; height: 140px; " v-for="pokemon in state.pokemons">
                    <router-link :to="{ name: 'showPoke', params: { slug: pokemon.name } }">

                        <!-- number di pokemon -->
                        <div class="number_pokemon">
                            <span v-if="pokemon.id.toString().length == 1">#000{{ pokemon.id }}</span>
                            <span v-if="pokemon.id.toString().length == 2">#00{{ pokemon.id }}</span>
                            <span v-if="pokemon.id.toString().length == 3">#0{{ pokemon.id }}</span>
                        </div>

                        <!-- immagine del pokemon -->
                        <div class="img_pokemon">
                            <img v-if="pokemon.sprites.other.dream_world.front_default" id="img_poke"
                                :src="pokemon.sprites.other.dream_world.front_default" alt="" class="">
                            <img v-else id="img_poke" :src="pokemon.sprites.other.home.front_default" alt="">
                        </div>

                        <!-- nome del pokemon -->
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

                <!-- bottone prev -->
                <div class="button_prev_page" v-if="this.state.prev" @click="prevPage(this.state.prev)">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </div>

                <!-- pagine -->
                <div class="pages_less_than_four" v>
                    <div class="page" v-for="page in pages" @click="goToPage(page)"
                        :class="[page === this.state.page ? 'active_page' : '']">
                        <span>{{ page }}</span>
                    </div>
                </div>

                <!-- bottone next -->
                <div class="button_next_page" v-if="this.state.next" @click="nextPage(this.state.next)">
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </div>
            </div>

        </div>
    </main>
    <!-- /#site_main -->
</template>

<style></style>