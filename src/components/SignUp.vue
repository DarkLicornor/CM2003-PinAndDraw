<!--
Component managing the Signup of a new user
 -->

<template>
  <div class="signEmail">
      <div class="foo box">
        <input v-model="email" class="inputText" type="text" name="email" placeholder="Your Email">
      </div>
      <div class="foo box">
        <input v-model="pwd" class="inputText" type="password" name="pwd" placeholder="Your Password">
      </div>
      <div class="foo box">
        <input v-model="pwd1" class="inputText" type="password" name="pwd" placeholder="Confirm your password">
      </div>
      <div class="pwd"><input type="checkbox" name="showPwd" value="1">Show password</div>
      <p> {{error}} </p>
      <button @click="signup">Sign up</button>
      <a>Forgot password ?</a>
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
    ...mapActions([
      'setCurrentUser'
    ])
  },
  data: function() {
    return {
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
    signup() {
      let context = this
      if(this.pwd == this.pwd1) {
        this.getFirebaseAuth.createUserWithEmailAndPassword(this.email, this.pwd)
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
      } else {
        this.error = "Passwords doesn't match"
      }
    }
  }
}
</script>
