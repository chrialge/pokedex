<script>
import axios from 'axios';



export default {
  name: "EvolutionPoke",
  data() {
    return {
        urlPokemon : [],
        pokemon: [],
    }
  },
  props:{
    url: String,
  },
  methods:{
    getEvolution(){
        console.log(this.url)
        axios.get(this.url)
            .then(response =>{
                
                console.log(this.urlPokemon)
                if(response.data.chain){
                    this.urlPokemon.push(response.data.chain.species.name)
                    this.urlPokemon.push(response.data.chain.evolves_to[0].species.name)
                    this.urlPokemon.push(response.data.chain.evolves_to[0].evolves_to[0].species.name)
                    console.log(response.data)
                }
                console.log(response, this.response)

                if(this.urlPokemon.length > 0 && this.urlPokemon != undefined)
                this.urlPokemon.forEach(poke => {
                    axios.get("https://pokeapi.co/api/v2/pokemon/" + poke)
                        .then(resp =>{
                            console.log(this.pokemon)

                            this.pokemon.push(resp.data)
                            console.log(this.pokemon)

                        }).catch(error =>{
                            console.error(error)
                        })
                });
            }).catch(error =>{
                console.error(error)
            })
    },
    capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
  },
  mounted(){
    document.addEventListener('DOMContentLoaded', event=>{
        this.getEvolution()
    })

    this.getEvolution()
  }
}
</script>

<template>
<div class="evolution_container" v-if="pokemon.length > 0">
    <h2 class="text-center text-secondary">Evolution</h2>
    <div class="d-flex justify-content-around align-items-center" :class="'row-cols-' + this.pokemon.length">
        <div class="card_poke_evolution" v-for="poke in this.pokemon" style="max-width: 200px;min-height: 100%;">
            <div class="img_pokemon">
                <img v-if="poke.sprites.other.dream_world.front_default" class="w-100" id="img_poke"
                    :src="poke.sprites.other.dream_world.front_default" alt="">
                <img v-else id="img_poke" :src="poke.sprites.other.home.front_default" alt="">
            </div>
            <div class="name text-center">
                <h5>{{ capitalizeFirstLetter(poke.name.replace("-", " ")) }}</h5>
            </div>
        </div>
    </div>
</div>




</template>

<style></style>
