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

      <p> email is : {{email}}, pwd is : {{pwd}}</p>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'users',
			'getFirebaseRefUsers',
      'getFirebaseApp'
    ]),
  },
  data: function() {
    return {
        email: '',
        pwd: ''
    }
  },
  mounted: function(){
    console.log("this", this)
  },
  methods: {
    signin() {
      this.getFirebaseApp.signInWithEmailAndPassword(this.email, this.pwd).catch(function(error) {
        // Handle Errors here.
        console.log("marche pas",error.message)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }
  }
}
</script>
