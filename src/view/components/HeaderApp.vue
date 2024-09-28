<script>
import { state } from '../../state.js';
export default {
    name: 'HeaderApp',
    data() {
        return {
            search: '',
            state,
            teams: [],
            value: 5,
        }
    },
    methods: {
        searchPokemon() {
            if (this.search.length >= 2) {
                this.state.filterPokemon(this.search);
            } else {
                this.state.callApi();
            }
        },
        getVolume(){
            const volumeEl = document.getElementById('volume_music');
            if(volumeEl){
                console.log(volumeEl.value)
            }

        }
    },
    mounted() {
        console.log(localStorage.getItem('teams'))
        if (localStorage.getItem('teams')) {
            const teams = JSON.parse(localStorage.getItem('teams'));
            teams.forEach(team => this.teams.push(team.name))
        }
        console.log(this.teams)
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
        <div class="dropdown_menu">
            <div class="teams">
                <h5>
                    Teams
                    <img src="../../../public/img/pokemon-trainer.png" alt="" width="20px">
                </h5>
                <ul>
                    <li v-for="team in this.teams">
                        <img src="../../../public/img/pokeballs.png" alt="" width="20px">
                        {{ team }}
                    </li>

                </ul>
            </div>
            <div class="volume d-flex align-items-center gap-1">
                <i class="fa-solid fa-volume-high"></i>
                <input id="volume_music" min="0" max="10" step="1" type="range" :onchange="getVolume()" :oninput="getVolume()" v-model="value"/>
                <audio id="audio_mp3" autoplay loop
                    src="../../../public/audio/music-sottofondo.mp3">

                    <span>Il tuo browser non riesce a caricare l'audio</span>
                </audio>
            </div>
        </div>

    </header>
    <!-- /#site_header -->
</template>

<style></style>