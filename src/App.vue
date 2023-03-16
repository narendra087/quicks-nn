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
    metaInfo: {
      title: 'Quicks App - by NN'
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