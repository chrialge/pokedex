<script>
import axios from 'axios';
import { state } from '../state.js';


export default {
    name: 'ShowPoke',
    data() {
        return {
            state,
            loading: true,
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
                {
                    type: 'fairy',
                    color: "#fb6f92"
                },
            ],

        }
    },

    methods: {
        /**
         * funzione che mi rida il pokemon con tutti i suoi dati
         * @param params l'id del pokemon
         */
        getSinglePokemon(params) {

            // stato di caricamento true
            this.loading = true

            // svuoto le tipologie dei pokemon
            this.typesPoke = [];



            // setto per formare l'url
            let url = this.base_api_url + '/' + params;

            // chiamata api
            axios.get(url)
                .then(response => {

                    // setto come tipologia del pokemon la prima tipologia
                    let typePoke = response.data.types[0].type.name;

                    // prendo tutte le tipologie del pokemon
                    const typespoke = response.data.types

                    // setto il pokemon con la risposta
                    this.pokemon = response.data;

                    // itero per tutte le tipologie
                    this.types.forEach(type => {

                        // se la tipologia e uguale a quella del pokemon
                        if (type.type === typePoke) {

                            // setto il colore della tipologia
                            document.getElementById('app').style.backgroundColor = type.color

                            // setto il colore della pagina
                            this.colorPage = type.color;
                        }

                        // itero per tutte le tipologie del pokemon
                        typespoke.forEach(typepoke => {

                            // se la tipologia del pokemon e uguale a quella dellla tipologia della iterazione
                            if (typepoke.type.name == type.type) {

                                // setto un oggetto
                                const formatType = { name: typepoke.type.name, color: type.color }

                                // pusho l'oggetto
                                this.typesPoke.push(formatType);
                            }
                        })
                    });

                    // chiamata api 
                    axios.get(response.data.species.url)
                        .then(response => {

                            // invoco la funzione per prendere l'evoluzioni
                            this.getEvolution(response.data.evolution_chain.url)

                            // itero per le varie descrizioni del pokemon
                            response.data.flavor_text_entries.forEach((text, index) => {

                                // se la lingua della descrizione e inglese
                                if (text.language.name == 'en') {

                                    // se e il primo ciclo
                                    if (index == 0) {

                                        // setto la descrizione
                                        this.description = text.flavor_text
                                    }

                                }
                            })

                            // se l'url della evoluzione salvata e uguale a quella della chiamata
                            if (this.evolutionChain == response.data.evolution_chain.url) {

                                // stato di caricaemnto falso
                                this.loading = false;
                            }
                        }).catch(error => {
                            console.error(error)
                        })

                }).catch(error => {
                    console.error(error);
                    this.$router.push({ name: 'home' })
                })

        },

        /**
         * funzione che ritorna una stringa con la prima lettera in maiuscolo
         * @param string 
         */
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        /**
         * funzione che mida il pokemon seguente
         * @param id del pokemon corrente 
         */
        nextPokemon(id) {

            // aumento di uno l'id
            id++;

            // invoco la funzione che mi da il pokemon e i suoi dati
            this.getSinglePokemon(id);
        },

        /**
         * funzione che mida il pokemon precedente
         * @param id del pokemon corrente
         */
        prevPokemon(id) {

            // diminuisco di uno l'id
            id--;

            // invoco la funzione chi da il pokemon con i suoi dati
            this.getSinglePokemon(id);
        },

        /**
         * funzione per chiudere la modale
         */
        closeModal() {
            this.activeModal = false;
        },

        /**
         * funzione per mostare le modale
         */
        openModal() {
            this.activeModal = true;
        },

        /**
         * funzione che mi aggiunge il pokemon al team
         * @param id del pokemon
         */
        addPokemon(id) {

            // se esiste il team nel local storage
            if (localStorage.getItem('teams')) {

                // salvo i teams
                let teams = JSON.parse(localStorage.getItem('teams'));


                // salvo il valore dell'input
                const value = document.getElementById('name_team').value;

                // variabile di ancoraggio
                let teamNew = true;

                // variabile di non riuscita
                let badResponse = false;

                // se esitono 6 team
                if (teams.length === 6) {

                    // non riuscita = true
                    badResponse = true;
                } else {

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

                                // non riuscita = true
                                badResponse = true;
                            }
                        }
                    });
                }

                // se  la non riuscita e true
                if (badResponse == true) {

                    // se ci sono 6 team
                    if (teams.length === 6) {

                        // messaggio di risposta 
                        this.message = "You can't have more of six teams"
                    } else {

                        // messaggio che dice che esiste gia il pokemon
                        this.message = `you cannot add pokemon, because is already on your team ${value}`
                    }

                    // setto il non successo true
                    this.notSuccess = true;
                } else if (teamNew === true) {

                    // variabile del formato del team
                    const formatTeam = { 'name': value, 'pokemon': [id] };

                    // pusho il team
                    teams.push(formatTeam);

                    // messaggio di creazione di un nuovo team
                    this.message = `New Team ${formatTeam.name} has been created successfully.`

                    // setto il successo con true
                    this.succefull = true;

                    // set team con le nuove modifiche fatte a team
                    localStorage.setItem('teams', JSON.stringify(teams));



                } else {
                    // messaggio per aver aggiunto il pokemon
                    this.message = `Congratulations, your team member has been successfully added!`

                    // setto il successo con true
                    this.succefull = true;

                    // set team con le nuove modifiche fatte a team
                    localStorage.setItem('teams', JSON.stringify(teams));
                }

                // chiudo la modale
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

                    // setto il successo con true
                    this.succefull = true;

                    // setto il successo con true
                    this.closeModal()
                }
            }
        },

        /**
         * funzione che formata il numero
         * @param numero 
         * return di una stringa del numero formato
         */
        number_format(numero) {

            // splitto il numero
            let number = numero.toString().split('');

            // inizializzo una variabile
            let string = '';

            // itero per tutti i sinole cifre del numero
            for (let index = 0; index < number.length; index++) {

                // singola cifra
                const singleNumber = number[index];

                // se ha una singola cifra
                if (number.length === 1) {

                    // setto la stringa
                    string = '0,' + singleNumber
                } else {

                    // prendo l'ultima cifra
                    if (index == number.length - 1) {

                        // se e uguale a zero
                        if (singleNumber == 0) {

                        } else {
                            // setto la parte decimale
                            string += ',' + singleNumber
                        }

                    } else {
                        // aggiungo i numeri
                        string += singleNumber;
                    }
                }
            }
            // ritorna il numero formato
            return string
        },

        /**
         * funzione che mi da tutte l'evoluzione
         * @param url 
         */
        getEvolution(url) {

            // se il link passato non e uguale a quello salvato
            if (this.evolutionChain != url) {


                // salvo il link dell'url
                this.evolutionChain = url;

                // chiamata axios per prendere l'albero dell'evoluzioni
                axios.get(this.evolutionChain)
                    .then(response => {


                        // libero l'array
                        this.evolutionPoke = [];

                        // chiamata per il poikemon base

                        axios.get('https://pokeapi.co/api/v2/pokemon/' + response.data.chain.species.name)
                            .then(resp => {

                                // pusho la risposta 
                                this.evolutionPoke.push(resp.data)

                                // se ha una singola prima evoluzione
                                if (response.data.chain.evolves_to.length == 1) {

                                    // chiamata per la prima evoluzaione
                                    axios.get('https://pokeapi.co/api/v2/pokemon/' + response.data.chain.evolves_to[0].species.name)
                                        .then(resp => {

                                            // pusho la risposta
                                            this.evolutionPoke.push(resp.data)

                                            // se ha una seconda evoluzione  
                                            if (response.data.chain.evolves_to[0].evolves_to.length > 0) {

                                                // chamata api per la seconda evoluzione
                                                axios.get('https://pokeapi.co/api/v2/pokemon/' + response.data.chain.evolves_to[0].evolves_to[0].species.name)
                                                    .then(resp => {

                                                        // pusho la risposta
                                                        this.evolutionPoke.push(resp.data)
                                                    }).catch(error => {
                                                        console.error(error)
                                                    })
                                            }
                                        }).catch(error => {
                                            console.error(error)
                                        })

                                } else {

                                    // itero per tutte le prime evoluzioni
                                    response.data.chain.evolves_to.forEach(poke => {

                                        // chamate per le diverse prime evoluzioni
                                        axios.get('https://pokeapi.co/api/v2/pokemon/' + poke.species.name)
                                            .then(resp => {

                                                // pusho la risposta
                                                this.evolutionPoke.push(resp.data)

                                                // se ha una seconda evoluzione  
                                                if (response.data.chain.evolves_to[0].evolves_to.length > 0) {

                                                    // chiamata api per la seconda evoluzione
                                                    axios.get('https://pokeapi.co/api/v2/pokemon/' + response.data.chain.evolves_to[0].evolves_to[0].species.name)
                                                        .then(resp => {

                                                            // pusho la risposta
                                                            this.evolutionPoke.push(resp.data)

                                                        }).catch(error => {
                                                            console.error(error)
                                                        })
                                                }
                                            }).catch(error => {
                                                console.error(error)
                                            })
                                    })
                                }

                            }).catch(error => {
                                console.error(error)
                            })

                        // stato di caricamento falso
                        this.loading = false;

                    }).catch(error => {
                        console.error(error)
                    })
            }

        },

        /**
         * funzione per ritornare indietro
         */
        returnPage() {

            history.back()
        }

    },
    mounted() {

        // invoco la funzione passando il parameto della rotta
        this.getSinglePokemon(this.$route.params.slug);
    }

}
</script>

<template>

    <!-- in fase di caricamento -->
    <template v-if="this.loading">
        <div class="container_loading">
            <div class="loader"></div>
        </div>
    </template>


    <!-- app -->
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

        <!-- header -->
        <div class="header" id="header_poke">

            <!-- left header -->
            <div class="left_header">

                <!-- bottone che mi riporta alla pagina home -->

                <i class="fa fa-arrow-left" aria-hidden="true" style="font-size: 25px; cursor: pointer;"
                    @click="returnPage()"></i>


                <!-- nome del pokemon -->
                <h2>{{ capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}</h2>
            </div>

            <!-- right header -->
            <div class="right_header">

                <!-- numero del pokemon -->
                <span v-if="this.pokemon.id.toString().length === 1">#000{{ this.pokemon.id }}</span>
                <span v-else-if="this.pokemon.id.toString().length === 2">#000{{ this.pokemon.id }}</span>
                <span v-else-if="this.pokemon.id.toString().length === 3">#000{{ this.pokemon.id }}</span>
                <span v-else>#{{ this.pokemon.id }}</span>
            </div>
        </div>

        <!-- contenitore dell'immagine -->
        <div class="container_img" v-if="this.pokemon">

            <!-- bottone per il pokemon precedente -->
            <i class="fa fa-chevron-left" aria-hidden="true" @click="prevPokemon(this.pokemon.id)"
                v-if="this.pokemon.id > 1"></i>

            <!-- immagine del pokemon -->
            <img v-if="pokemon.sprites.other.dream_world.front_default" id="img_poke"
                :src="pokemon.sprites.other.dream_world.front_default" alt="">
            <img v-else :src="pokemon.sprites.front_default" alt="">

            <!-- bottone per il pokemon seguente -->
            <i class="fa fa-chevron-right" aria-hidden="true" @click="nextPokemon(this.pokemon.id)"></i>
        </div>

        <!-- il corpo dove ci sono i vari dati del pokemon -->
        <div id="body_info">

            <!-- bottone di cattura del pokemon -->
            <div class="catch_btn d-flex justify-content-center mb-2">
                <button type="button" class="btn btn-warning d-flex align-items-center gap-1" data-toggle="modal"
                    @click="openModal()">
                    <img src="../../public/img/pokeball_catch.png" alt="" width="20px">
                    <h3 class="m-0">Catch!</h3>
                </button>
            </div>

            <!-- badge per le tipologie del pokemon -->
            <div class="badges" id="badges">
                <span class="badge_color" v-for="type in this.typesPoke" :style="{ backgroundColor: type.color }">
                    {{ capitalizeFirstLetter(type.name) }}
                </span>
            </div>

            <!-- info fisiche e ability -->
            <div class="about">
                <h1>about</h1>
                <div class="detail_poke">

                    <!--peso pokemon  -->
                    <div class="weight">
                        <div class="top">
                            <i class="fa-solid fa-weight-hanging"></i>
                            {{ number_format(this.pokemon.weight) }} kg
                        </div>
                        <div class="bottom">
                            <h5 class="m-0" :style="{ color: this.colorPage }">Weight</h5>
                        </div>
                    </div>

                    <!-- altezza pokemon -->
                    <div class="height">
                        <div class="top">
                            <i class="fa-solid fa-ruler-vertical"></i>
                            {{ number_format(this.pokemon.height) }} M
                        </div>
                        <div class="bottom">
                            <h5 class="m-0" :style="{ color: this.colorPage }">Height</h5>
                        </div>
                    </div>

                    <!-- abilita pokemon -->
                    <div class="moves">
                        <div class="top">
                            <span v-for="ability in this.pokemon.abilities">{{
                                this.capitalizeFirstLetter(ability.ability.name.replace('-', ' ')) }}</span>
                        </div>
                        <div class="bottom">
                            <h5 class="m-0" :style="{ color: this.colorPage }">Abilities</h5>
                        </div>
                    </div>
                </div>

                <!-- descrizione del pokemon -->
                <p class="description text-dark" style="font-size: 20px;">
                    {{ this.description.replace('', ' ') }}
                </p>

                <!-- statistiche -->
                <h1>Base Stasts</h1>

                <!-- itero per per le tutte statistiche -->
                <div class="stats_poke" v-for="stat in this.pokemon.stats">
                    <div id="card_stat" class="card_stat">

                        <!-- condizioni per le varie tipologie statistiche -->
                        <div class="typology" v-if="stat.stat.name == 'hp'">
                            <span class="m-0" :style="{ color: this.colorPage }"><b>HP</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'attack'">
                            <span class="m-0" :style="{ color: this.colorPage }"><b>ATK</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'defense'">
                            <span class="m-0" :style="{ color: this.colorPage }"><b>DEF</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-attack'">
                            <span class="m-0" :style="{ color: this.colorPage }"><b>SATK</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-defense'">
                            <span class="m-0" :style="{ color: this.colorPage }"><b>SDEF</b></span>
                        </div>
                        <div class="typology" v-else-if="stat.stat.name == 'speed'">
                            <span class="m-0" :style="{ color: this.colorPage }"><b>SPD</b></span>
                        </div>

                        <!-- la barra per la statistica -->
                        <div class="stat">
                            <div class="number_stat">{{ stat.base_stat }}</div>
                            <div class="barra_stat">
                                <div class="progress" :style="{ backgroundColor: this.colorPage + '80' }">
                                    <div class="progress-bar" role="progressbar"
                                        :style="{ width: (stat.base_stat / 3 * 2) + '%', backgroundColor: this.colorPage }"
                                        :aria-valuenow="stat.base_stat" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- container per l'evoluzioni pokemon -->
                <div class="evolution_container mt-5" v-if="evolutionPoke.length > 0">
                    <h2 class="text-center text-secondary">Evolution</h2>
                    <div class="d-flex justify-content-around align-items-center row row-cols-1"
                        :class="'row-cols-lg-' + this.evolutionPoke.length">

                        <!-- card per le evoluzioni -->
                        <div class="card_poke_evolution " v-for="poke in this.evolutionPoke"
                            style="max-width: 200px; height: 220px;">

                            <!-- immagine dell'evoluzione -->
                            <div class="img_pokemon">
                                <img v-if="!poke.sprites.other.dream_world.front_default" height="200px" class="w-100"
                                    id="img_poke" :src="`${poke.sprites.front_default}`" alt="">
                                <img v-else id="img_poke" height="200px" class="w-100"
                                    :src="poke.sprites.other.dream_world.front_default" alt="">
                            </div>

                            <!-- nome del pokemon -->
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