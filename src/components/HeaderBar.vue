<!--
Component Display the header of the web-App, with navigation menu.
 -->

<template>
	<div class="headerBar">
		<img src="../assets/images/logo-500.png" alt="logo">
     <ul class="menu">
       <li :style=logout class="menuHeader"><router-link to="/boards">My boards</router-link></li>
       <li :style=signIn class="menuHeader"><router-link to="/signIn">Sign in</router-link></li>
			 <li :style=signIn class="menuHeader"><router-link to="/signUp">Sign Up</router-link></li>
			 <li :style=logout class="menuHeader"><router-link to="/account">My Account</router-link></li>
       <li :style=logout class="menuHeader"><a @click="doLogout">Logout</a></li>
       <li class="menuHeader"><router-link to="/about">About</router-link></li>
     </ul>
	</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'authCurrentUser',
      'getFirebaseAuth'
    ])
  },
	methods: {
    ...mapActions([
      'setAuthCurrentUser'
    ]),
		doLogout() {
			let context = this
			this.getFirebaseAuth.signOut()
			.then(function() {
				context.$router.push('/signIn')
			})
			.catch(function(err) {
				console.log("Cannot logout", err.message)
			})
		}
	},
  data: function() {
    return {
        signIn: '',
				logout: "visibility: hidden; width: 0",
    }
  },
	watch: {
		authCurrentUser: function(){
			if(this.authCurrentUser == null) {
				this.signIn = ''
				this.logout = 'visibility: hidden; width: 0'
			} else {
				this.logout = ''
				this.signIn = 'visibility: hidden; width: 0'
			}
		}
	},
}
</script>
