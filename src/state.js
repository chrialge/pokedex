
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


    /**
     * funzione che ha lo scopo di trovere entro un limite i pokemon
     * @param {string} url url per la chiamata api
     */
    callApi(url) {

        // svuoto l'array dove contengono i pokemon
        this.pokemons = []

        // fase di caricamento true
        this.loading = true;

        // request con axios
        axios.get(url).then((response) => {

            // salvo il link per la pagina prossima
            this.next = response.data.next;

            // salvo il link per la pagina precedente
            this.prev = response.data.previous;

            // se ci sono piu di 50 pokemon e se ancora non e stato modificato il contPage
            if (response.data.count > 50 && this.countPage === 0) {

                // salvo il numero di pagine
                this.countPage = Math.ceil(response.data.count / 50);
            }

            // salvo tutte le risposte
            const responsePoke = response.data.results

            // inizializzo una variabile
            let pokemonsUrl = [];

            // itero per tutte le risposte
            for (let index = 0; index < responsePoke.length; index++) {

                // variabile dove contiene la singola risposta
                const element = responsePoke[index];

                // pusho le promise
                pokemonsUrl.push(axios(element.url))

            }

            // quando tutte le promise si sono risolte
            Promise.all(pokemonsUrl).then((pokemons) => {

                // itero tra le request
                pokemons.forEach(pokemon => {

                    // pusho i pokemon
                    this.pokemons.push(pokemon.data)
                })
            });

            // la fase di caricamento e finito
            this.loading = false;
        }).catch(err => {

            // in console se ce un errore me lo mostra
            console.error(err)
        })
    },

    /**
     * funzione che filtra i pokemon che contengono la parola dell'input
     * @param {string} search stringa dell'input di cerca
     */
    filterPokemon(search) {

        // fase di caricamento true
        this.loading = true;

        // cambio il valore dell apggina seguente
        this.next = null;

        // cambio il valore della pagina precedente
        this.prev = null;

        // faccio una richiesta che mi da tutti i pokemon
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302').then((response) => {

            // svuto l'array dei pokemon
            this.pokemons = []

            // salvo i risultati
            const results = response.data.results

            // itero tra i risultati
            for (let index = 0; index < results.length; index++) {

                // salvo il risultato singolo
                const result = results[index];

                // salvo l'url del singolo risultato
                const urlPokemon = result.url;

                // salvo il nome del singolo risultato
                const namePokemon = result.name;

                // se il nome contiene il valore dell'input
                if (namePokemon.includes(search.trim().replace(' ', '-'))) {

                    // chiamata api del singolo pokemon
                    axios.get(urlPokemon).then((resp) => {

                        // deve essere uno dei pokemon tra 1 e 1302
                        if (resp.data.id <= 1302) {

                            // pusho il pokemon
                            this.pokemons.push(resp.data)
                        }
                    }).catch(err => {
                        console.error(err);
                    })
                }
            }

            // la fase di caricamento e finito
            this.loading = false;
        }).catch(error => {
            console.error(error)
        })

    },

})

