<!-- Component that allow the user to see his board
and manage his account -->
<template>
	<div class="account">
			<h1>My Account</h1>
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
							<img class="linkAccountImage" src="../assets/images/twitter.png" />
						</a>
					</div>
				</div>
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
							<img class="linkAccountImage" src="../assets/images/twitter.png" />
						</a>
					</div>
			</div>
			<h2>Password</h2>
				<div>
					<a class="button">Reset my password</a>
				</div>
			<h2>My Boards</h2>
			<div class="listBoards">
				<div class="miniBoard"> </div>
				<div class="miniBoard"> </div>
				<div class="miniBoard"> </div>
				<div class="miniBoard"> </div>
				<div class="miniBoard"> </div>
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
			}
		},
		watch: {
			'DBCurrentUser': function(){
				console.log(this.DBCurrentUser)
				if(this.DBCurrentUser !== null) {
					this.showGoogle = this.DBCurrentUser.googleToken ? true : false
					this.showFacebook = this.DBCurrentUser.facebookToken ? true : false
					this.showTwitter = this.DBCurrentUser.twitterToken ? true : false
					this.showPinterest = this.DBCurrentUser.pinterestToken ? true : false
				}
			}
		},
		mounted: function() {
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
						token: Pinterest.getSession().accessToken
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

<style>
 .accountLinks {
	 display: flex;
	 flex-direction: row;
	 align-items: center;
	 justify-content: space-around;
	 width: 20%;
	 margin: auto;
 }

 .buttonLink {
	 margin: 1em;
	 background: white;
	 cursor: pointer;
 }

 .linkAccountImage {
	 width: 6em;
 }
</style>
