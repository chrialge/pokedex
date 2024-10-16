
import { reactive } from 'vue'
import axios from 'axios'


//https://pokeapi.co/api/v2/pokemon?offset=0&limit=30
export const state = reactive({
    url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50',
    pokemons: [],
    prev: null,
    next: null,
    countPage: 0,
    page: 1,
    loading: false,



    callApi(url) {
        this.pokemons = []
        this.loading = true;
        axios.get(url).then((response) => {
            console.log(response);


            this.next = response.data.next;
            this.prev = response.data.previous;

            if (response.data.count > 50 && this.countPage === 0) {
                this.countPage = Math.ceil(response.data.count / 50);
                console.log(this.countPage)
            }

            for (let index = 0; index < response.data.results.length; index++) {
                const urlPokemon = response.data.results[index].url;

                axios.get(urlPokemon).then((resp) => {

                    this.pokemons.push(resp.data)

                })

            }

            this.loading = false;
        }).catch(err => {
            console.error(err)
        })
    },

    filterPokemon(search) {







        axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302').then((response) => {
            console.log(response);

            this.pokemons = []
            this.next = response.data.next;
            this.prev = response.data.previous;

            if (response.data.count > 50 && this.countPage === 0) {
                this.countPage = Math.ceil(response.data.count / 50);
                console.log(this.countPage)
            }


            console.log(response)
            let count = 0



            while (this.pokemons.length <= 50) {

                const urlPokemon = response.data.results[count].url;
                const namePokemon = response.data.results[count].name;


                if (namePokemon.includes(search)) {
                    axios.get(urlPokemon).then((resp) => {

                        if (resp.data.id <= 1302) {
                            this.pokemons.push(resp.data)
                            console.log(resp.data)
                        }



                    })
                }
                count++
            }


            console.log(this.pokemons)


        })




        // console.log(result)
        // this.pokemons = result;

    }
})

