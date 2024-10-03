<script>
import HeaderApp from './view/components/HeaderApp.vue';
import MainApp from './view/components/MainApp.vue'

export default {
  name: "App",
  data() {
    return {

    }
  },
  components: {
    HeaderApp,
    MainApp,
  }
}
</script>

<template>

<audio id="audio_mp3" loop src="../../../public/audio/music-sottofondo.mp3">
  <span>Il tuo browser non riesce a caricare l'audio</span>
</audio>
  <router-view></router-view>


</template>

<style></style>
