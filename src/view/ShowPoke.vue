<script>
import axios from 'axios';
import EvolutionPoke from './components/EvolutionPoke.vue';


export default {
    name: 'ShowPoke',
    data() {
        return {
            base_api_url: "https://pokeapi.co/api/v2/pokemon",
            evolutionChain: '',
            pokemon: null,
            color: null,
            activeModal: false,
            succefull: false,
            message: '',
            notSuccess: false,
            colorPage: '',
            typesPoke: [],
            description: '',
            types: [
                {
                    type: 'normal',
                    color: "#a8a878"
                },
                {
                    type: 'fire',
                    color: "#f08030"
                },
                {
                    type: 'water',
                    color: "#6890f0"
                },
                {
                    type: 'electric',
                    color: "#f8d030"
                },
                {
                    type: 'grass',
                    color: "#78c850"
                },
                {
                    type: 'ice',
                    color: "#98d8d8"
                },
                {
                    type: 'fighting',
                    color: "#c03028"
                },
                {
                    type: 'poison',
                    color: "#a040a0"
                },
                {
                    type: 'ground',
                    color: "#e0c068"
                },
                {
                    type: 'flying',
                    color: "#a890f0"
                },
                {
                    type: 'phychic',
                    color: "#f85888"
                },
                {
                    type: 'bug',
                    color: "#a8b820"
                },
                {
                    type: 'rock',
                    color: "#b8a038"
                },
                {
                    type: 'ghost',
                    color: "#7058f8"
                },
                {
                    type: 'dragon',
                    color: "#7038f8"
                },
                {
                    type: 'dark',
                    color: "#705848"
                },
                {
                    type: 'steel',
                    color: "#b8b8d0"
                },
            ],

        }
    },
    components:{
        EvolutionPoke,
    },
    methods: {
        getSinglePokemon(params) {
            this.typesPoke = [];
            let url = this.base_api_url + '/' + params;

            axios
                .get(url)
                .then(response => {
                    console.log(response.data.types[0].type.name);

                    let typePoke = response.data.types[0].type.name;
                    const typespoke = response.data.types

                    axios.get(response.data.species.url)
                        .then(response =>{
                            this.evolutionChain = response.data.evolution_chain.url;
                            response.data.flavor_text_entries.forEach((text, index) =>{
                                if(text.language.name == 'en'){
                                    if(index == 0){
                                        this.description = text.flavor_text
                                        console.log(this.description)
                                    }

                                }
                            })
                        }).catch(error =>{
                            console.error(error)
                        })
                    console.log(this.description)

                    this.types.forEach(type => {

                        if (type.type === typePoke) {
                            document.getElementById('app').style.backgroundColor = type.color
                            this.colorPage = type.color;
                        }

                        typespoke.forEach(typepoke=>{

                            if(typepoke.type.name == type.type){
                                const formatType = {name: typepoke.type.name, color: type.color}
                                this.typesPoke.push(formatType);
                            }
                        })
                    });

                    this.pokemon = response.data;


                }).catch(error => {
                    console.error(error);
                })

        },
        capitalizeFirstLetter(string) {

           return string.charAt(0).toUpperCase() + string.slice(1);
        },
        nextPokemon(id) {
            id++;
            this.getSinglePokemon(id);
        },
        prevPokemon(id) {
            id--;
            this.getSinglePokemon(id);
        },
        closeModal() {
            this.activeModal = false;
        },
        openModal() {
            this.activeModal = true;
        },
        addPokemon(id) {

            // se esiste il team nel local storage
            if (localStorage.getItem('teams')) {

                // salvo i teams
                let teams = JSON.parse(localStorage.getItem('teams'));

                // salvo il valore dell'input
                const value = document.getElementById('name_team').value;

                // variabile di ancoraggio
                let teamNew = true;

                let badResponse = false;

                // itireo nei teams
                teams.forEach(team => {

                    // se il nome dell'input e uguale al valore immesso
                    if (team.name === value) {

                        // cambio il valore di teamNew
                        teamNew = false;

                        // se non include gia l'id del pokemon
                        if (!team.pokemon.includes(id)) {

                            // pusha l'id
                            team.pokemon.push(id)
                        } else {

                            badResponse = true;

                        }

                    }
                });

                // se il valore di teamNew
                if (badResponse == true) {
                    // messaggio che dice che esiste gia
                    this.message = `you cannot add pokemon, because is already on your team ${value}`

                    this.notSuccess = true;
                } else if (teamNew === true) {

                    // variabile del formato del team
                    const formatTeam = { 'name': value, 'pokemon': [id] };


                    // messaggio di creazione di un nuovo team
                    this.message = `New Team ${formatTeam.name} has been created successfully.`

                    this.succefull = true;
                    // set team con le nuove modifiche fatte a team
                    localStorage.setItem('teams', JSON.stringify(teams));

                    // pusho il team
                    teams.push(formatTeam);
                } else {
                    // messaggio per aver aggiunto il pokemon
                    this.message = `Congratulations, your team member has been successfully added!`


                    this.succefull = true;
                    // set team con le nuove modifiche fatte a team
                    localStorage.setItem('teams', JSON.stringify(teams));
                }


                this.closeModal()

            } else {
                // se esiste il valore dell'input
                if (document.getElementById('name_team').value) {

                    // creo team
                    let team = [{ 'name': document.getElementById('name_team').value, 'pokemon': [id] }];

                    // salvo nello local storage il team
                    localStorage.setItem('teams', JSON.stringify(team));

                    // messaggio di creazione
                    this.message = `New Team ${team[0].name} has been created successfully.`

                    this.succefull = true;


                    this.closeModal()
                }
            }


        },
        number_format(numero){

            let number = numero.toString().split('');
            let string ='';

                for (let index = 0; index < number.length; index++) {
                    const singleNumber = number[index];

                    if(index == number.length - 1){
                        if(singleNumber == 0){

                        }else{
                            string += ',' + singleNumber 
                        }
                        
                    }else{
                        string += singleNumber;
                    }

                }
            return string

        }


    },
    mounted() {

        this.getSinglePokemon(this.$route.params.slug);


    }

}
</script>

<template>
    <div id="singleCardPoke" v-if="this.pokemon">




        <!-- Popup for message successfull -->
        <div class="modal_sucefully" v-show="this.succefull">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="icon-box">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                            @click="this.succefull = false">&times;</button>
                    </div>
                    <div class="modal-body text-center">
                        <h4>Great!</h4>
                        <p>{{ message }}</p>

                    </div>
                </div>
            </div>
        </div>

        <!-- Popup for message successfull -->
        <div class="modal_not_success" v-show="this.notSuccess">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="icon-box">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                            @click="this.notSuccess = false">&times;</button>
                    </div>
                    <div class="modal-body text-center">
                        <h4>sorry!</h4>
                        <p>{{ message }}</p>

                    </div>
                </div>
            </div>
        </div>

        <!-- modale per la cattura -->
        <div class="modal_catch" v-show="this.activeModal">
            <div class="card p-2">
                <div class="d-flex align-items-center justify-content-between gap-3">
                    <h4>Create personal team</h4>
                    <i class="fa-solid fa-x" style="cursor: pointer;" @click="closeModal()"></i>

                </div>

                <div class="card-body">
                    <form action="" method="get">
                        <div class="mb-3">
                            <label for="name_team" class="form-label">Name Team</label>
                            <input type="text" class="form-control" name="name_team" id="name_team"
                                aria-describedby="helpId" placeholder="" />
                            <small id="helpId" class="form-text text-muted">add name team</small>
                        </div>
                        <button type="submit" class="btn btn-warning d-flex align-items-center gap-1"
                            @click.prevent="addPokemon(this.pokemon.id)">
                            <img src="../../public/img/pokeball_catch.png" alt="" width="20px">
                            <h3 class="m-0">Catch!</h3>

                        </button>


                    </form>
                </div>
            </div>
        </div>

        <div class="header" id="header_poke">
            <div class="left_header">
                <router-link :to="{ name: 'home' }">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </router-link>
                <h2>{{ capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}</h2>
            </div>
            <div class="right_header">
                <span v-if="this.pokemon.id.toString().length === 1">#000{{ this.pokemon.id }}</span>
                <span v-else-if="this.pokemon.id.toString().length === 2">#000{{ this.pokemon.id }}</span>
                <span v-else-if="this.pokemon.id.toString().length === 3">#000{{ this.pokemon.id }}</span>
                <span v-else>#{{ this.pokemon.id }}</span>
            </div>
        </div>



        <div class="container_img" v-if="this.pokemon">
            <i class="fa fa-chevron-left" aria-hidden="true" @click="prevPokemon(this.pokemon.id)"
                v-if="this.pokemon.id > 1"></i>
            <img v-if="pokemon.sprites.other.dream_world.front_default" id="img_poke"
                :src="pokemon.sprites.other.dream_world.front_default" alt="">
            <img v-else id="img_poke" :src="pokemon.sprites.other.home.front_default" alt="">
            <i class="fa fa-chevron-right" aria-hidden="true" @click="nextPokemon(this.pokemon.id)"></i>
        </div>

        <div id="body_info">
            <div class="catch_btn d-flex justify-content-center mb-2">
                <button type="button" class="btn btn-warning d-flex align-items-center gap-1" data-toggle="modal"
                    @click="openModal()">
                    <img src="../../public/img/pokeball_catch.png" alt="" width="20px">
                    <h3 class="m-0">Catch!</h3>
                </button>






            </div>
            <div class="badges" id="badges">
                <span class="badge_color" v-for="type in this.typesPoke" :style="{backgroundColor: type.color}">
                    {{ capitalizeFirstLetter(type.name) }}
                </span>
            </div>
            <div class="about">
                <h1>about</h1>
                <div class="detail_poke">
                    <div class="weight">
                        <div class="top">
                            <i class="fa-solid fa-weight-hanging"></i>
                            {{ number_format(this.pokemon.weight) }} kg

                            

                        </div>
                        <div class="bottom">
                            <h5 class="m-0" :style="{color: this.colorPage}">Weight</h5>
                        </div>

                    </div>
                    <div class="height">
                        <div class="top">
                            <i class="fa-solid fa-ruler-vertical"></i>
                            {{ number_format(this.pokemon.height) }} M
                        </div>
                        <div class="bottom">
                            <h5 class="m-0" :style="{color: this.colorPage}">Height</h5>
                        </div>
                    </div>
                    <div class="moves">
                        <div class="top">
                            <span v-for="ability in this.pokemon.abilities">{{ ability.ability.name }}</span>
                        </div>
                        <div class="bottom">
                            <h5 class="m-0" :style="{color: this.colorPage}">Abilities</h5>
                        </div>

                    </div>
                </div>
                <p class="description text-dark" style="font-size: 20px;">
                    {{this.description.replace('', ' ')}}
                </p>
                <EvolutionPoke  :url="this.evolutionChain"/>
                <h1>Base Stasts</h1>
                <div class="stats_poke" v-for="stat in this.pokemon.stats">
                    <div id="card_stat" class="card_stat">
                        <div class="typology" v-if="stat.stat.name == 'hp'">
              
                            <h5 class="m-0" :style="{color: this.colorPage}">HP</h5>

                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'attack'">
                            <h5 class="m-0" :style="{color: this.colorPage}">ATK</h5>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'defense'" >
                            <h5 class="m-0" :style="{color: this.colorPage}">DEF</h5>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-attack'">
                            <h5 class="m-0" :style="{color: this.colorPage}">SATK</h5>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-defense'">
                            <h5 class="m-0" :style="{color: this.colorPage}">SDEF</h5>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'speed'">
                            <h5 class="m-0" :style="{color: this.colorPage}">SPD</h5>
                        </div>


                        <div class="stat">
                            <div class="number_stat">{{ stat.base_stat }}</div>
                            <div class="barra_stat">
                                <div class="progress" :style="{backgroundColor: this.colorPage + '80'}">
                                    <div class="progress-bar" role="progressbar"
                                        :style="{ width: stat.base_stat + '%', backgroundColor: this.colorPage }"
                                        :aria-valuenow="stat.base_stat" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style></style>