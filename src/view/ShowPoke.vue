<script>
import axios from 'axios';


export default {
    name: 'ShowPoke',
    data() {
        return {
            base_api_url: "https://pokeapi.co/api/v2/pokemon",
            evolutionChain: '',
            pokemon: null,
            evolutionPoke: [],
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
                    type: 'psychic',
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
    methods: {
        getSinglePokemon(params) {
            this.typesPoke = [];
            let url = this.base_api_url + '/' + params;

            axios
                .get(url)
                .then(response => {
   

                    let typePoke = response.data.types[0].type.name;
                    const typespoke = response.data.types


                    axios.get(response.data.species.url)
                        .then(response =>{

                            
                            this.getEvolution(response.data.evolution_chain.url)

                            response.data.flavor_text_entries.forEach((text, index) =>{
                                if(text.language.name == 'en'){
                                    if(index == 0){
                                        this.description = text.flavor_text

                                    }

                                }
                            })
                        }).catch(error =>{
                            console.error(error)
                        })


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

                if(teams.length === 6){
                    badResponse = true;
                }else{

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
                }

                

                

                // se il valore di teamNew
                if (badResponse == true) {

                    if(teams.length === 6){

                        this.message = "You can't have more of six teams"
                    }else{
                        // messaggio che dice che esiste gia
                        this.message = `you cannot add pokemon, because is already on your team ${value}`
                    }


                    this.notSuccess = true;
                } else if (teamNew === true) {

                    

                    // variabile del formato del team
                    const formatTeam = { 'name': value, 'pokemon': [id] };

                    // pusho il team
                    teams.push(formatTeam);

                    // messaggio di creazione di un nuovo team
                    this.message = `New Team ${formatTeam.name} has been created successfully.`

                    this.succefull = true;
                    // set team con le nuove modifiche fatte a team
                    localStorage.setItem('teams', JSON.stringify(teams));



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
                    if(number.length === 1){
                        string = '0,' + singleNumber
                    }else{
                        if(index == number.length - 1){
                            if(singleNumber == 0){
                                
                            }else{
                                string += ',' + singleNumber 
                            }
                            
                        }else{
                            string += singleNumber;
                        }
                    }
                }
            return string
        },

        getEvolution(url){

            // se il link passato non e uguale a quello salvato
            if(this.evolutionChain  != url){

                let pokemonsArray = [];
                // salvo il link dell'url
                this.evolutionChain = url;

                // chiamata axios per prendere l'albero dell'evoluzioni
                axios.get(this.evolutionChain)
                    .then(response =>{


                        // libero l'array
                        this.evolutionPoke = [];

                        // prendo il nome dei pokemon
                        let urlPokemon = [];

                        // pusho il pokemon base
                        urlPokemon.push(response.data.chain.species.name)

                        // se ha una evoluzione di primo livello
                        if(response.data.chain.evolves_to.length>0){

                            // se ha una singola seconda evoluzione
                            if(response.data.chain.evolves_to.length == 1){
                                // pusho il nome
                                urlPokemon.push(response.data.chain.evolves_to[0].species.name)
                            }else{
                                // itero per tutte le seconde evoluzioni
                                response.data.chain.evolves_to.forEach(poke =>{
                                    // pusho il nome
                                    urlPokemon.push(poke.species.name)
                                }) 
                            }

                                                    // se ha una terza evoluzione  
                        if(response.data.chain.evolves_to[0].evolves_to.length > 0){
                            // pusho il nome
                            urlPokemon.push(response.data.chain.evolves_to[0].evolves_to[0].species.name)
                        }
                            
                        }


                            for (let index = 0; index < urlPokemon.length; index++) {
                                const pokemon = urlPokemon[index];
                                
                                axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon)
                                    .then(resp =>{

                                        this.evolutionPoke.push(resp.data);
                                    }).catch(error =>{
                                        console.error(error)
                                    })
                                
                            }

 
                        
                }).catch(error =>{
                    console.error(error)
                })
            }

        },

        returnPage(){
            history.back()
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
                        <p class="text-dark" style="font-size: 18px;">{{ message }}</p>

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
                        <p class="text-dark" style="font-size: 18px;">{{ this.message }}</p>

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

                    <i class="fa fa-arrow-left" aria-hidden="true" style="font-size: 25px; cursor: pointer;" @click="returnPage()"></i>

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
                            <span v-for="ability in this.pokemon.abilities">{{ this.capitalizeFirstLetter(ability.ability.name.replace('-', ' ')) }}</span>
                        </div>
                        <div class="bottom">
                            <h5 class="m-0" :style="{color: this.colorPage}">Abilities</h5>
                        </div>

                    </div>
                </div>
                <p class="description text-dark" style="font-size: 20px;">
                    {{this.description.replace('', ' ')}}
                </p>
                

                <h1>Base Stasts</h1>
                <div class="stats_poke" v-for="stat in this.pokemon.stats">
                    <div id="card_stat" class="card_stat">
                        <div class="typology" v-if="stat.stat.name == 'hp'">
                            <span class="m-0" :style="{color: this.colorPage}"><b>HP</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'attack'">
                            <span class="m-0" :style="{color: this.colorPage}"><b>ATK</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'defense'" >
                            <span class="m-0" :style="{color: this.colorPage}"><b>DEF</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-attack'">
                            <span class="m-0" :style="{color: this.colorPage}"><b>SATK</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-defense'">
                            <span class="m-0" :style="{color: this.colorPage}"><b>SDEF</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'speed'">
                            <span class="m-0" :style="{color: this.colorPage}"><b>SPD</b></span>
                        </div>


                        <div class="stat">
                            <div class="number_stat">{{ stat.base_stat }}</div>
                            <div class="barra_stat">
                                <div class="progress" :style="{backgroundColor: this.colorPage + '80'}">
                                    <div class="progress-bar" role="progressbar"
                                        :style="{ width: (stat.base_stat / 3 * 2) + '%', backgroundColor: this.colorPage }"
                                        :aria-valuenow="stat.base_stat" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="evolution_container mt-5" v-if="evolutionPoke.length > 0">
                    <h2 class="text-center text-secondary">Evolution</h2>
                    <div class="d-flex justify-content-around align-items-center row row-cols-1" :class="'row-cols-lg-' + this.evolutionPoke.length">
                        <div class="card_poke_evolution " v-for="poke in this.evolutionPoke" style="max-width: 200px; height: 220px;">

                                <div class="img_pokemon" >
                                    <img v-if="poke.sprites.other.dream_world.front_default" height="200px" class="w-100" id="img_poke"
                                        :src="poke.sprites.other.dream_world.front_default" alt="">
                                    <img v-else id="img_poke" height="200px" class="w-100" :src="`${poke.sprites.front_default}`" alt="" >
                                </div>
                            <div class="name text-center">
                                <h5>{{ capitalizeFirstLetter(poke.name.replace("-", " ")) }}</h5>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    </div>

</template>

<style></style>