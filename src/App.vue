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
      FooterBar
    }
  }
</script>

<style>
  @font-face {
      font-family: "Panama";
      src: url("./assets/fonts/Panama/Panama-Light.otf");
  }
  @font-face {
      font-family: "Saigonese";
      src: url("./assets/fonts/Saigonese.otf");
  }
  @font-face {
      font-family: "Sunday";
      src: url("./assets/fonts/sunday.otf");
  }
  body {
    font-family: Panama, Helvetica, sans-serif;
  }
  .router-link-active{
    border-bottom: 2px solid #ff0043 !important;
  }

	ul {
		list-style-type: none;
  }

	a {
	text-decoration: none !important;
	color: white;
	}

  textarea, input { outline: none; }
</style>
