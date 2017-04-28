<!--
Component managing the Signup of a new user
 -->

<template>
  <div class="sign">
    <div class="signProviders">
      <div class="reducer">
        <div class="providerButton">
          <img class="providerImage" src="../assets/images/google.png" />
          <button class="google"  @click="googleSignin">Sign up with Google</button>
        </div>
        <div class="providerButton">
          <img class="providerImage" src="../assets/images/facebook.png" />
          <button class="facebook"  @click="facebookSignin">Sign up with Facebook</button>
        </div>
        <div class="providerButton">
          <img class="providerImage" src="../assets/images/twitter.png" />
          <button class="twitter"  @click="twitterSignin">Sign up with Twitter</button>
        </div>
      </div>
    </div>
    <div class="signEmail">
      <div class="reducer">
        <div class="foo box">
          <input v-model="email" class="inputText" type="text" name="email" placeholder="Your Email">
        </div>
        <div v-show="showPass" class="foo box">
          <input v-model="pwd" class="inputText" type="text" name="pwd" placeholder="Your Password">
        </div>
        <div v-show="showPass" class="foo box">
          <input v-model="pwd1" class="inputText" type="text" name="pwd" placeholder="Confirm your password">
          </div>
        <div v-show="!showPass" class="foo box">
          <input v-model="pwd" class="inputText" type="password" name="pwd" placeholder="Your Password">
        </div>
        <div v-show="!showPass" class="foo box">
          <input v-model="pwd1" class="inputText" type="password" name="pwd" placeholder="Confirm your password">
        </div>

        <div class="pwd"><input type="checkbox" v-model="showPass" >Show password</div>
        <p> {{error}} </p>
        <button @click="signup">Sign up</button>
        <a>Forgot password ?</a>
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
      'getFirebaseAuth',
      'authCurrentUser'
    ])
  },
  watch: {
    authCurrentUser: function() {
      console.log('currentUser', this.authCurrentUser)
        if(this.authCurrentUser !== null) {
            this.$router.push('/account')
        }
      }
  },
  mounted: function() {
    console.log('currentUser', this.authCurrentUser)
      if(this.authCurrentUser !== null) {
          this.$router.push('/account')
      }
    },
  components: {FirebaseAuth},
  data: function() {
    return {
        showPass: false,
        email: '',
        pwd: '',
        pwd1: '',
        error: '',
    }
  },
  mounted: function(){
    console.log("this", this)
  },
  methods: {
    //Register a new user
    signup() {
      let context = this
      if(this.pwd == this.pwd1) {
        this.getFirebaseAuth.createUserWithEmailAndPassword(this.email, this.pwd)
        .then(function() {
          let updates = {}
          updates['/users/' + context.getFirebaseAuth.currentUser.uid] = {
            email: context.email,
            boards: []
          }
          context.getFirebaseDB.ref().update(updates)
          context.$router.push('/board')
        })
        .catch(function(err) {
          context.error = err.message
        })
      } else {
        this.error = "Passwords doesn't match"
      }
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
