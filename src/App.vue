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

  <router-view></router-view>


</template>

<style></style>
