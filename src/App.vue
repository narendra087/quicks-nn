<template>
  <div id="app">
    <CoverScreen :isLoading="isLoading" />
    <router-view />
  </div>
</template>

<script>
  import CoverScreen from './components/CoverScreen.vue';
  
  export default {
    components: {
      CoverScreen,
    },
    data() {
      return {
        isLoading: true,
      }
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000);
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
</style>