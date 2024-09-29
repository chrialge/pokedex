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
            teamsVisible: false,
            dropdown: false,
        }
    },
    methods: {

        /**
         * funzione che filtra i pokemon
         */
        searchPokemon() {

            // se l'istanza search e piu o uguale a due cartteri
            if (this.search.length >= 2) {

                // chiamo la funzione dello sate che filtra i pokemon
                this.state.filterPokemon(this.search);
            } else {

                // faccio una chiamata api
                this.state.callApi();
            }
        },

        /**
         * funzione per gestire il volume della musica
         */
        getVolume(){

            // salvo l'elemento ddell'icona del volume
            const iconEl = document.getElementById('icon_volume');

            // salvo l'input per il volume
            const volumeEl = document.getElementById('volume_music');

            // salvo il tag dove e contenuto l'audio
            const audioEl = document.getElementById('audio_mp3');
            
            // se esiste l'input
            if(volumeEl){

                // se il valore del input e 0
                if(volumeEl.value == 0){

                    // setto l'attributo src dell'immagine
                    iconEl.setAttribute('src', '../../../public/img/volume-mute.png');

                    // metto muto all'audio
                    audioEl.muted = true;
                    
                }else if(volumeEl.value.length == 1){//altrimenti se la lunghezza della stringa e 1
                    
                    // se l'audio e muto
                    if(audioEl.muted === true){
                        // il valore di muto diventa false
                        audioEl.muted = false;
                    }

                    // se l'immagine e del volume muto
                    if(iconEl.getAttribute('src') === '../../../public/img/volume-mute.png'){

                        // cambio l'immagine dell'icona
                        iconEl.setAttribute('src', '../../../public/img/high-volume.png');
                    }

                    // cambio il valore che sia adattabile per il volume
                    const volumeInput = parseFloat('0.'+volumeEl.value);
                    
                    // setto il volume
                    audioEl.volume = volumeInput;

                }else{

                    // se l'audio e muto
                    if(audioEl.muted === true){
                        // cambio il valore di muto in false
                        audioEl.muted = false;
                    }

                    // se l'immagine e del volume muto
                    if(iconEl.getAttribute('src') === '../../../public/img/volume-mute.png'){
                        // cambio l'immagine del volume
                        iconEl.setAttribute('src', '../../../public/img/high-volume.png');
                    }

                    // cambio il valore per essere compatibile per volume
                    const volumeInput = parseInt(volumeEl.value.charAt(0));

                    // setto il volume dell'audio
                    audioEl.volume = volumeInput;

                }

            }

        },

        /**
         * funzione cha cambia l'immagine, il valore di muto e il valore dell'input
         */
        iconAudio(){
            
            // salvo l'elemento ddell'icona del volume
            const iconEl = document.getElementById('icon_volume');

            // salvo il tag dove e contenuto l'audio
            const audioEl = document.getElementById('audio_mp3');

            // salvo l'input per il volume
            const volumeEl = document.getElementById('volume_music');

            if(iconEl.getAttribute('src') === '../../../public/img/volume-mute.png'){

               volumeEl.value = 5; 

                // cambio l'immagine dell'icona
                iconEl.setAttribute('src', '../../../public/img/high-volume.png');

                // metto muto all'audio
                audioEl.muted = false;

            }else{

               volumeEl.value = 0; 

                // setto l'attributo src dell'immagine
                iconEl.setAttribute('src', '../../../public/img/volume-mute.png');

                // metto muto all'audio
                audioEl.muted = true;
            }
        },

        visibleTeam(){
            if(this.teamsVisible === false){
                this.teamsVisible = true;
                document.getElementById('more_info').setAttribute('src','../../../public/img/minus-sign.png');
            }else{
                this.teamsVisible = false;
                document.getElementById('more_info').setAttribute('src','../../../public/img/square.png');
            }
        }
    },
    mounted() {
        
        // se ci sono teams nel local strorage
        if (localStorage.getItem('teams')) {

            // prende i dati salvati in tem
            const teams = JSON.parse(localStorage.getItem('teams'));

            // pusho iteam nell'istanza teams
            teams.forEach(team => this.teams.push(team.name))
        }

        // prendo l'elemento audio 
        const audioEl = document.getElementById('audio_mp3');

        // richiamo il metodo play del tag audio
        audioEl.play()

        // do come valore di loop dell'elemen=nto audio true
        audioEl.loop = true;
    }

}
</script>

<template>
    <header id="site_header">
        <div class="title">
            <img src="../../../public/img/pokeball.png" alt="">
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

            <div class="dropdown_menu" @click="this.dropdown = !this.dropdown">
                <i class="fa-solid fa-bars"></i>
            </div>

        </div>
        <div class="dropdown_menu py-2" v-show="this.dropdown">
            <div class="teams">
                <div class="header_teams d-flex justify-content-between" @click="visibleTeam()">
                    <h5 class="text-white">
                    Teams
                    <img src="../../../public/img/pokemon-trainer.png" alt="" width="20px" >
                    </h5>
                    <div class="left">
                        <img id="more_info" src="../../../public/img/square.png" alt="" width="30px">
                    </div>
                </div>

                <ul class="list-unstyled ps-3" v-show="this.teamsVisible">
                    <li class="text-white" v-for="team in this.teams">
                        <router-link :to="{ name: 'teams', params: { slug: team } }">
                            <img src="../../../public/img/pokeballs.png" alt="" width="20px">
                            {{ team }}
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="volume d-flex align-items-center gap-1 ps-2">
                <img id="icon_volume" src="../../../public/img/high-volume.png" alt="" width="30px" @click="iconAudio()">
                <input id="volume_music" min="0" max="10" step="1" type="range" :onchange="getVolume()"  v-model="value"/>
                <audio id="audio_mp3" loop
                    src="../../../public/audio/music-sottofondo.mp3">

                    <span>Il tuo browser non riesce a caricare l'audio</span>
                </audio>
            </div>
        </div>

    </header>
    <!-- /#site_header -->
</template>

<style></style>