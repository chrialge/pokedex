<script>
import axios from 'axios';
export default {
    name: 'HeaderApp',
    data() {
        return {
            search: '',

        }
    },
    methods: {
        searchPokemon() {
            if (this.search.length >= 2) {
                console.log(this.search)
                const url = 'https://pokeapi.co/api/v2/pokemon/' + this.search;
                axios.get(url).then((response) => {
                    console.log(response.data);
                }).catch(err => {
                    console.error(err);

                })
            }
        }
    }

}
</script>

<template>
    <header id="site_header">
        <div class="title">
            <img src="../../public/img/pokeball.png" alt="">
            <h1>
                Pokedex
            </h1>
        </div>
        <div class="right_navbar">
            <div class="searchbar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" name="search" id="search" placeholder="Cerca..." v-model="search"
                    @keyup="searchPokemon">
            </div>

            <div class="dropdown_menu">
                <i class="fa-solid fa-bars"></i>
            </div>
        </div>


    </header>
    <!-- /#site_header -->
</template>

<style></style>