<script>
import { state } from '../../state.js';
export default {
    name: 'HeaderApp',
    data() {
        return {
            search: '',
            state,
        }
    },
    methods: {
        searchPokemon() {
            if (this.search.length >= 2) {
                this.state.filterPokemon(this.search);
            } else {
                this.state.callApi();
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