<!-- Component that allow the user to see his board
and manage his account -->
<template>
	<div class="account">
			<h1>My Account</h1>
			<p v-if="DBCurrentUser != null"> {{DBCurrentUser.email}}</p>
			<h2>Link my accounts</h2>
				<div v-if="!showGoogle || !showFacebook || !showTwitter || !showPinterest">
					<p>Connect your account with : </p>
					<div class="accountLinks">
						<a v-if="!showGoogle" class="buttonLink" @click="googleLink">
							<img class="linkAccountImage" src="../assets/images/google.png" />
						</a>
						<a v-if="!showFacebook" class="buttonLink" @click="facebookLink">
							<img class="linkAccountImage" src="../assets/images/facebook.png" />
						</a>
						<a v-if="!showTwitter" class="buttonLink" @click="twitterLink">
							<img class="linkAccountImage" src="../assets/images/twitter.png" />
						</a>
						<a v-if="!showPinterest" class="buttonLink" @click="pinterestLink">
							<img class="linkAccountImage" src="../assets/images/pinterest.png" />
						</a>
					</div>
				</div>
				<p>{{providerError}} </p>
				<div v-if="showGoogle || showFacebook || showTwitter || showPinterest">
					<p> Unlink your account from : </p>
					<div class="accountLinks">
						<a v-if="showGoogle" class="buttonLink" @click="googleUnlink">
							<img class="linkAccountImage" src="../assets/images/google.png" />
						</a>
						<a v-if="showFacebook" class="buttonLink" @click="facebookUnlink">
							<img class="linkAccountImage" src="../assets/images/facebook.png" />
						</a>
						<a v-if="showTwitter" class="buttonLink" @click="twitterUnlink">
							<img class="linkAccountImage" src="../assets/images/twitter.png" />
						</a>
						<a v-if="showPinterest" class="buttonLink" @click="pinterestUnlink">
							<img class="linkAccountImage" src="../assets/images/pinterest.png" />
						</a>
					</div>
			</div>
			<h2>Password</h2>
				<div>
					<a class="button">Reset my password</a>
				</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions  } from 'vuex'
	import firebase from 'firebase'
	import FirebaseAuth from '../util/firebase'
	import Pinterest from '../util/pinterest'


	export default {
		computed: {
	    ...mapGetters([
				'authCurrentUser',
				'DBCurrentUser',
				'getFirebaseDB',
				'getFirebaseAuth',
				'DBCurrentUserVuex',
				'getState',
	    ])
	  },
		data: function() {
	    return {
				showGoogle: null,
				showFacebook: null,
				showTwitter: null,
				showPinterest: null,
				providerError: null,
			}
		},
		watch: {
			//Check wich APIs are already linked. This is done as a watch as the currentUser is return by an Async firebase method (after mount)
			'DBCurrentUser': function(){
				if(this.DBCurrentUser !== null) {
					this.showGoogle = this.DBCurrentUser.googleToken ? true : false
					this.showFacebook = this.DBCurrentUser.facebookToken ? true : false
					this.showTwitter = this.DBCurrentUser.twitterToken ? true : false
					this.showPinterest = this.DBCurrentUser.pinterestToken ? true : false
				}
			}
		},
		//Redirect to /signIn if not logged in
		beforeMount: function() {
			if(this.authCurrentUser === null) {
					this.$router.push('/signIn')
			}
		},
		mounted: function() {
			//Same as the watch
			console.log(this.DBCurrentUser)
			if(this.DBCurrentUser !== null) {
				this.showGoogle = this.DBCurrentUser.googleToken ? true : false
				this.showFacebook = this.DBCurrentUser.facebookToken ? true : false
				this.showTwitter = this.DBCurrentUser.twitterToken ? true : false
				this.showPinterest = this.DBCurrentUser.pinterestToken ? true : false
			}
		},
		components: {
			FirebaseAuth,
			Pinterest,
		},
	  methods: {
	  	//Methods to link and unlink APIs
			googleLink() {
				FirebaseAuth.linkWithProvider({
					context: this,
					name: "google",
					provider: new firebase.auth.GoogleAuthProvider()
				})
			},
			facebookLink() {
				FirebaseAuth.linkWithProvider({
					context: this,
					name: "facebook",
					provider: new firebase.auth.FacebookAuthProvider()
				})
			},
			twitterLink() {
				FirebaseAuth.linkWithProvider({
					context: this,
					name: "twitter",
					provider: new firebase.auth.TwitterAuthProvider()
				})
			},
			pinterestLink(){
				Pinterest.login(() => {
					FirebaseAuth.linkPinterest({
						context: this,
						token: Pinterest.getSession()
					})
				})
			},
			googleUnlink() {
				FirebaseAuth.unlinkFromProvider({
					context: this,
					name: "googleToken",
					providerId: "google.com"
				})
			},
			facebookUnlink() {
				FirebaseAuth.unlinkFromProvider({
					context: this,
					name: "facebookToken",
					providerId: "facebook.com"
				})
			},
			twitterUnlink() {
				FirebaseAuth.unlinkFromProvider({
					context: this,
					name: "twitterToken",
					providerId: "twitter.com"
				})
			},
			pinterestUnlink(){
				FirebaseAuth.unlinkPinterest({
					context: this
				})
				Pinterest.logout()
			},
	    ...mapActions([
	      'storeToken',
	    ]),
		},
	}
</script>
