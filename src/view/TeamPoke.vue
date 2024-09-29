<script>
import HeaderApp from './components/HeaderApp.vue';

export default {
    name: "TeamPoke",
    data() {
        return {

        }
    },
    methods:{
        getTeam(name){
            if (localStorage.getItem('teams')) {

                // prende i dati salvati in tem
                const teams = JSON.parse(localStorage.getItem('teams'));

                console.log(teams)
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
<main id="site_team">

</main>
   

</template>

<style></style>
