import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router'
import { sync } from 'vuex-router-sync'
import { mapGetters, mapActions } from 'vuex'

const firebase = require('firebase')

var config = {
   apiKey: "AIzaSyCT1m8IuiG2gtUxwtCN0w_PU2BJpWnhvsI",
   authDomain: "pinanddraw.firebaseapp.com",
   databaseURL: "https://pinanddraw.firebaseio.com",
   storageBucket: "pinanddraw.appspot.com",
   messagingSenderId: "686544491404"
 };
var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database()
sync(store, router)

store.commit('SETFIREBASEDB', db)
store.commit('SETFIREBASEAUTH', firebase.auth())

const app = new Vue({
  created () {
    this.$store.dispatch('setPinsRef', db.ref('pins'))
  },
  el: '#app',
  router,
  store,
  ...App
})

export { app, router, store }
