<!-- Component that allow the user to see his boards -->
<template>
  <div class="myBoards">
  	<h2>My Boards</h2>
  	<div class="listBoards">
      <Spinner v-if="boardsList == null" />
      <div @click="showBoard(board)" class="miniBoard" v-else v-for="(board, index) in boardsList">
        <p>{{board.title}}</p>
  	</div>
  </div>
</div>
</template>

<style>
.myBoards {
	width: 70%;
	margin: auto;
	text-align: center;
  margin-top: 3em;
}

.myBoards .button {
	background-color: rgb(20, 160, 197);
	padding: 1em;
	cursor: pointer;
}

.myBoards .button:hover {
	background-color: #08627a;
}
.myBoards h2 {
  padding: 1em;
	margin: 1em;
}

.listBoards {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
.miniBoard {
	margin: 1em;
	width: 20em;
	height: 20em;
	background-color: rgb(20, 160, 197);
	cursor: pointer;
}

.miniBoard:hover {
	background-color: #fff133;
}

</style>

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
        'myBoards'
	    ]),
      boardsList() {
        let value = this.myBoards
        delete value[".key"]
        return value
      }
    },
    methods: {
      ...mapActions([
        'setCurrentBoard'
      ]),
      showBoard: function(board) {
        this.setCurrentBoard(board)
        this.$router.push('/board')
      }
    },
    
		data: function() {
	    return {
			}
		},
		beforeMount: function() {
			if(this.authCurrentUser === null) {
					this.$router.push('/signIn')
			}
		}
  }
</script>
