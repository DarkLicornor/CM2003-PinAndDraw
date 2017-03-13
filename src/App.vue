<template>
  <div id="app" style="height:100vh;">
    <HeaderBar></HeaderBar>
     <router-view class="view"></router-view>
    <Board></Board>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar.vue'
  import Board from './components/Board.vue'

  export default {
    name: 'comp',
    components: {
      HeaderBar,
      Board
    }
  }
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
  .router-link-active{
    color: red ;
  }
</style>
