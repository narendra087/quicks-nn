<template>
  <div :class="{'loader': true, 'fadeout': !isLoading}">
    <div class="title">
      <h1>Simple</h1>
      <h2>Quicks</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CoverScreen",
    props: ["isLoading"]
  }
</script>

<style lang="scss" scoped>
  @use '../assets/partials/colors';
  .loader {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #FFF;
    min-height: 100vh;
    display: flex;
    position: fixed;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background-color: map-get(colors.$colors, 'cover');
  }
  
  h1, h2 {
    color: #FFF;
    font-size: 190px;
    max-width: 875px;
    line-height: 174px;
    font-family: 'Lato';
  }
  .title {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .fadeout {
    animation: fadeout 1s forwards;
  }

  @keyframes fadeout {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>