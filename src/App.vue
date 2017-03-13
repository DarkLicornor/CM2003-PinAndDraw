<template>
  <div id="app" style="height:100vh;">
    <!-- <Header></Header> -->
     <ul>
       <li><router-link to="/" exact>Home</router-link></li>
       <li><router-link to="/topics">Topics</router-link></li>
       <li><router-link to="/counter">Counter</router-link></li>
       <li><router-link to="/about">About</router-link></li>
     </ul>
     <router-view class="view"></router-view>
    <Board></Board>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Board from './components/Board.vue'

  export default {
    name: 'comp',
    components: {
      Header,
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
