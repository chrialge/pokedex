<script>
import HeaderApp from './components/HeaderApp.vue';
import MainApp from './components/MainApp.vue'

export default {
    name: "App",
    data() {
        return {

        }
    },
    components: {
        HeaderApp,
        MainApp,
    },
    mounted() {
        document.getElementById('app').style.backgroundColor = '#c32f27';
    }
}
</script>

<template>


    <HeaderApp />
    <MainApp />
    <footer class="text-center text-white">
        <span>&copy; 2024 Christian Algieri</span>
    </footer>


</template>

<style></style>
