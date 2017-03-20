<!-- Component that allow the user to see his board
and manage his account -->
<template>
	<div class="account">
			<div> {{users}} </div>
			<button @click="push">Click me!</button>
			<h1>My Account</h1>
			<h2>Password</h2>
				<div>
					<a>Reset my password</a>
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
import { mapGetters} from 'vuex'
export default {
	computed: {
    ...mapGetters([
      'users',
			'getFirebaseRefUsers'
    ]),
  },
  methods:{
		push() {
			this.getFirebaseRefUsers.push({
			  text: 'hello'
			})
		}
	},
}

</script>
