<!-- Initial component including the header and the router content -->
<template>
  <div id="app" style="height:100vh;">
    <HeaderBar></HeaderBar>
     <router-view class="view"></router-view>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar.vue'
  import FooterBar from './components/FooterBar.vue'
  import { mapGetters, mapActions} from 'vuex'

  export default {
    name: 'comp',
    components: {
      HeaderBar,
      FooterBar,
    },
    computed: {
      ...mapGetters([
        'getFirebaseAuth',
        'getFirebaseDB'
      ])
    },
    methods: {
      ...mapActions([
        'setAuthCurrentUser',
        'setDBCurrentUser',
        'setDBCurrentUserRef'
      ]),
    },

    mounted: function() {
      //Get if the user is already connected
      let context = this
      context.getFirebaseAuth.onAuthStateChanged(function(user) {
        context.setAuthCurrentUser(user)
        if(user != null) {
          //If yes, retrieve it's informations
          context.setDBCurrentUserRef(context.getFirebaseDB.ref('/users/' + user.uid))
        }
      })
    },
  }
</script>
  <style src="./style/main.css">
</style>
