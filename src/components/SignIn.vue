<!--
Component managing the Signin of an already registered user
 -->

<template>
  <div class="signEmail">
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
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

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
        error: ''
    }
  },
  mounted: function(){
    console.log("this", this)
  },
  methods: {
    ...mapActions([
      'setCurrentUser'
    ]),
    signin() {
      let context = this
      this.getFirebaseAuth.signInWithEmailAndPassword(this.email, this.pwd)
      .then(function() {
        context.getFirebaseDB.ref('users').push({
          email: context.email,
          uid: context.getFirebaseAuth.currentUser.uid,
          boards: []
        })
        context.$router.push('/board')
      })
      .catch(function(err) {
        context.error = err.message
      })
    }
  }
}
</script>
