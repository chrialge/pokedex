<script>
import HeaderApp from './components/HeaderApp.vue';
import axios from 'axios';

export default {
    name: "TeamPoke",
    data() {
        return {
            pokemonId: [],
            pokemons: [],
        }
    },
    methods:{
        getTeam(name){
            if (localStorage.getItem('teams')) {

                // prende i dati salvati in tem
                const teams = JSON.parse(localStorage.getItem('teams'));

                console.log(teams)

                teams.forEach(team => {
                    if(team.name == name){
                        this.pokemonId = team.pokemon
                        console.log(this.pokemonId)
                        this.pokemonId.forEach(id=>{
                            console.log(id)
                            axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
                                .then(response =>{
                                    console.log(response.data)
                                    this.pokemons.push(response.data)
                                }).catch(error =>{
                                    console.error(error)
                                })
                        })
                    }
                });
            }
        },
        capitalizeFirstLetter(string) {

        return string.charAt(0).toUpperCase() + string.slice(1);
        },
        returnPage(){
            history.back()
        },
        deleteTeam(){
            const name = this.$route.params.slug

            if (localStorage.getItem('teams')) {

                // prende i dati salvati in tem
                const teams = JSON.parse(localStorage.getItem('teams'));

                console.log(teams)

                const result = teams.filter(team =>{
                    if(team.name === name){

                    }else{
                        return team
                    }
                })

                console.log(result)
            }
        }
    },
    components: {
        HeaderApp,

    },
    mounted(){
        document.getElementById('app').style.backgroundColor = '#c32f27';
        this.getTeam(this.$route.params.slug);
    }
}
</script>

<template>

 
<HeaderApp />
<main id="site_main">
        <div class="container_main">
            <div class="header_team d-flex align-items-center">
                <h2 class=" flex-grow-1">Team {{ this.$route.params.slug }}</h2>
                <div class="actions pe-1 d-flex gap-1 align-items-center">
                    <button class="btn btn-danger" @click="deleteTeam()">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-dark" @click="returnPage()">
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                </div>
                
            </div>

            <div class="container_pokemon">
            

            <div class="card" style="width: 150px; height: 140px; " v-for="pokemon in this.pokemons">
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
                        <span id="name_poke" class="text-dark">{{ capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}</span>
                    </div>
                </router-link>


            </div>
        </div>
        </div>

    </main>
   

</template>

<style></style>
