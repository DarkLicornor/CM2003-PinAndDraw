<!-- Initial component including the header and the router content -->
<template>
  <div id="app" style="height:100vh;">
    <HeaderBar></HeaderBar>
     <router-view class="view"></router-view>
    <!-- <FooterBar></FooterBar> -->
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar.vue'
  import FooterBar from './components/FooterBar.vue'

  export default {
    name: 'comp',
    components: {
      HeaderBar,
      FooterBar,
    }
  }
</script>
  <style src="./style/main.css">
</style>
