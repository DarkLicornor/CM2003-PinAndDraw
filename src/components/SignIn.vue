<!--
Component managing the Signin of an already registered user
 -->

<template>
  <div class="sign">
    <div class="signProviders">
      <div class="reducer">
        <div class="providerButton">
          <img class="providerImage" src="../assets/images/google.png" />
          <button class="google" @click="googleSignin">Sign in with Google</button>
        </div>
        <div class="providerButton">
          <img class="providerImage" src="../assets/images/facebook.png" />
          <button class="facebook" @click="facebookSignin">Sign in with Facebook</button>
        </div>
        <div class="providerButton">
          <img class="providerImage" src="../assets/images/twitter.png" />
          <button class="twitter" @click="twitterSignin">Sign in with Twitter</button>
        </div>
        <p> {{providerError}} </p>
      </div>
    </div>
    <div class="signEmail">
      <div class="reducer">
        <div class="foo box">
          <input class="inputText"
            v-model="email"
            type="text"
            placeholder="Your Email">
        </div>
        <div class="foo box">
          <input class="inputText" type="password" v-model="pwd" placeholder="Your Password">
        </div>
        <div class="pwd"><input type="checkbox" name="showPwd" value="1">Show password</div>
        <button @click="signin">Sign in</button>
        <a>Forgot password ?</a>
        <p> {{error}} </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import firebase from 'firebase'
import FirebaseAuth from '../util/firebase'

export default {
  computed: {
    ...mapGetters([
      'users',
			'getFirebaseDB',
      'getFirebaseAuth'
    ]),
  },
  data: function() {
    return {
        email: '',
        pwd: '',
        error: '',
        providerError: '',
    }
  },
  components: {FirebaseAuth},
  methods: {
    signin() {
      let context = this
      this.getFirebaseAuth.signInWithEmailAndPassword(this.email, this.pwd)
      .then(function() {
        context.$router.push('/board')
      })
    },
    googleSignin() {
      FirebaseAuth.signWithProvider({
        context: this,
        provider: new firebase.auth.GoogleAuthProvider(),
        name: "google"
      })
    },
    facebookSignin() {
      FirebaseAuth.signWithProvider({
        context: this,
        provider: new firebase.auth.FacebookAuthProvider(),
        name: "facebook"
      })
    },
    twitterSignin() {
      FirebaseAuth.signWithProvider({
        context: this,
        provider: new firebase.auth.TwitterAuthProvider(),
        name: "twitter"
      })
    }
  }
}
</script>
