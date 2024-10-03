<script>
import HeaderApp from './components/HeaderApp.vue';
import axios from 'axios';

export default {
    name: "TeamPoke",
    data() {
        return {
            pokemonId: [],
            pokemons: [],
            modalCancelTeam: false,
            modalCalcelPokemon: false,
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
                localStorage.setItem('teams', JSON.stringify(result))

                
                this.modalCancelTeam = false;
                location.reload()
                console.log(result)
            }
        },
        deletePokemon(id){
            console.log(id)
            const name = this.$route.params.slug

            let idPokemons = [];
            // prende i dati salvati in tem
            const teams = JSON.parse(localStorage.getItem('teams'));

            console.log(teams)

            teams.map(team =>{
                if(team.name === name){
                    idPokemons = team.pokemon.filter(idPoke =>{
                        if(idPoke != id){
                            return idPoke
                        }
                    })
                    return team.pokemon = idPokemons
                }
                return team
            })
            localStorage.setItem('teams', JSON.stringify(teams))
            this.modalCalcelPokemon = false
            location.reload()
            
            console.log(idPokemons,teams)
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

    <!-- modale per la cancellazione del team -->
    <div class="modal_cancel_team" v-show="this.modalCancelTeam">

        <!-- card --> 
        <div class="card">

            <!-- card-header -->
            <div class="card-header position-relative">
                <h3 class="text-center">Attention!</h3>
                <i class="fa fa-close position-absolute" aria-hidden="true" style="font-size: 20px; top: 10px; right: 10px; cursor: pointer;" @click="this.modalCancelTeam = !this.modalCancelTeam"></i>
            </div>

            <!-- card-body -->
            <div class="card-body">
                <p class="card-text text-dark" style="font-size: 18px;"> 
                    Are you sure you want to permanently delete this Team {{ this.$route.params.slug }} and all its pokemon?
                    If yes, click on button of delete.
                </p>
            </div>

            <!-- card-footer -->
            <div class="card-footer text-muted d-flex justify-content-center">
                <button class="btn btn-danger" @click="deleteTeam()">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span class="ps-1">Delete</span>
                </button>
            </div>
        </div>
    </div>

    


        <!-- container del main -->
        <div class="container_main">

            <!-- intestazione del main -->
            <div class="header_team d-flex align-items-center">

                <!-- nome team -->
                <h2 class=" flex-grow-1">Team {{ this.$route.params.slug }}</h2>

                <!-- azioni di cancellazione team e di torna indietro -->
                <div class="actions pe-1 d-flex gap-1 align-items-center">
                    <button class="btn btn-danger" @click="this.modalCancelTeam = !this.modalCancelTeam">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-dark" @click="returnPage()">
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                </div>          
            </div>

            <!-- container dove mostro i pokemon del team -->
            <div class="container_pokemon">
            
                <!--container card + bottone  -->
                <div class="container_card d-flex gap-1" v-for="pokemon in this.pokemons">

                    <!-- card per ogni pokemon -->
                    <div class="card" style="width: 150px; height: 140px; ">

                        <!-- la rotta per mandare alla pagina in cui mostra il singolo pokemon -->
                        <router-link :to="{ name: 'showPoke', params: { slug: pokemon.name } }">

                            <!-- numero del pokemon -->
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

                            <!-- nome pokemon -->
                            <div class="name_pokemon">
                                <span id="name_poke" class="text-dark">{{ capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}</span>
                            </div>
                        </router-link>
                    </div>
                    
                    <!-- bottone di cancellazione del pokemon -->
                    <button class="btn btn-danger" style="width: 50px; height: 50px;" @click="this.modalCalcelPokemon = !this.modalCalcelPokemon">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>


                                        <!-- modale per la cancellazione del team -->
                    <div class="modal_cancel_team" v-show="this.modalCalcelPokemon">

                        <!-- card --> 
                        <div class="card">

                            <!-- card-header -->
                            <div class="card-header position-relative">
                                <h3 class="text-center">Attention!</h3>
                                <i class="fa fa-close position-absolute" aria-hidden="true" style="font-size: 20px; top: 10px; right: 10px; cursor: pointer;" @click="this.modalCalcelPokemon = !this.modalCalcelPokemon"></i>
                            </div>

                            <!-- card-body -->
                            <div class="card-body">
                                <p class="card-text text-dark" style="font-size: 18px;"> 
                                    Are you sure you want to permanently delete this Pokemon {{ capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}?
                                    If yes, click on button of delete.
                                </p>
                            </div>

                            <!-- card-footer -->
                            <div class="card-footer text-muted d-flex justify-content-center">
                                <button class="btn btn-danger" @click="deletePokemon(pokemon.id)">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <span class="ps-1">Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </main>
   

</template>

<style></style>
