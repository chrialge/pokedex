<script>
import axios from 'axios';
export default {
    name: 'ShowPoke',
    data() {
        return {
            base_api_url: "https://pokeapi.co/api/v2/pokemon",
            pokemon: null,
            color: null,
        }
    },
    methods: {
        getSinglePokemon(params) {
            let url = this.base_api_url + '/' + params;

            axios
                .get(url)
                .then(response => {
                    console.log(response.data);
                    this.pokemon = response.data;
                    if (response.data.success == true) {

                        // this.loading = false;
                    } else {
                        // this.$router.push({ name: 'not-found' })
                    }


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
        }

    },
    mounted() {
        console.log()
        this.getSinglePokemon(this.$route.params.slug);

    }

}
</script>

<template>
    <div id="singleCardPoke" v-if="this.pokemon">

        <div class="header" id="header_poke">
            <div class="left_header">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                <h2>{{ capitalizeFirstLetter(pokemon.name.replace("-", " ")) }}</h2>
            </div>
            <div class="right_header">
                <span v-if="this.pokemon.id.toString().length === 1">#000{{ this.pokemon.id }}</span>
                <span v-else-if="this.pokemon.id.toString().length === 2">#000{{ this.pokemon.id }}</span>
                <span v-else-if="this.pokemon.id.toString().length === 3">#000{{ this.pokemon.id }}</span>
                <span v-else>#{{ this.pokemon.id }}</span>
            </div>
        </div>

        <div class="container_img">
            <i class="fa fa-chevron-left" aria-hidden="true" @click="prevPokemon(this.pokemon.id)"
                v-if="this.pokemon.id > 1"></i>
            <img v-if="pokemon.sprites.other.dream_world.front_default" id="img_poke"
                :src="pokemon.sprites.other.dream_world.front_default" alt="">
            <img v-else id="img_poke" :src="pokemon.sprites.other.home.front_default" alt="">
            <i class="fa fa-chevron-right" aria-hidden="true" @click="nextPokemon(this.pokemon.id)"></i>
        </div>

        <div id="body_info">
            <div class="badge">
                <span v-for="type in this.pokemon.types">{{ capitalizeFirstLetter(type.type.name) }}</span>
            </div>
            <div class="about">
                <h1>about</h1>
                <div class="detail_poke">
                    <div class="weight">
                        <div class="top">
                            <i class="fa-solid fa-weight-hanging"></i>
                            {{ this.pokemon.weight }}
                        </div>
                        <div class="bottom">
                            <span>Weight</span>
                        </div>

                    </div>
                    <div class="height">
                        <div class="top">
                            <i class="fa-solid fa-ruler-vertical"></i>
                            {{ this.pokemon.height }}
                        </div>
                        <div class="bottom">
                            <span>Height</span>
                        </div>
                    </div>
                    <div class="moves">
                        <div class="top">
                            <span v-for="ability in this.pokemon.abilities">{{ ability.ability.name }}</span>
                        </div>
                        <div class="bottom">
                            <span>Abilities</span>
                        </div>

                    </div>
                </div>
                <p class="description">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda magni nemo accusamus omnis quis
                    optio error eaque dolorum. Facilis quaerat nulla earum excepturi rem maxime inventore. Doloribus
                    officiis ipsam quos!
                </p>
                <h1>Base Stasts</h1>
                <div class="stats_poke" v-for="stat in this.pokemon.stats">
                    <div class="card_stat">
                        <div class="typology" v-if="stat.stat.name == 'hp'">{{ stat.stat.name.toUpperCase() }}</div>
                        <div class="typology" v-else-if="stat.stat.name == 'attack'">ATK</div>
                        <div class="typology" v-else-if="stat.stat.name == 'defense'">DEF</div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-attack'">SATK</div>
                        <div class="typology" v-else-if="stat.stat.name == 'special-defense'">SDEF</div>
                        <div class="typology" v-else-if="stat.stat.name == 'speed'">SPD</div>


                        <div class="stat">
                            <div class="number_stat">{{ stat.base_stat }}</div>
                            <div class="barra_stat">
                                <div class="progress">
                                    <div class="progress-bar " role="progressbar"
                                        :style="{ width: stat.base_stat + '%' }" :aria-valuenow="stat.base_stat"
                                        aria-valuemin="0" aria-valuemax="100">
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