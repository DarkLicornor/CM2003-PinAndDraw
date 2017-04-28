<!-- Component that allow the user to see his boards -->
<template>
  <div class="myBoards">
  	<h2>My Boards</h2>
    <button class="createButton" @click="createBoard">Create a board</button>
    <p> or select one : </p>
  	<div class="listBoards">
      <Spinner v-if="boardsList == null" />
      <div class="miniBoard" v-else v-for="(board, index) in boardsList">
        <div class="miniBoardHeader"><p @click="showBoard(board)" >{{board.title}}</p><img @click="deleteBoard(board)" src="../assets/images/cancel.png"/></div>
        <img @click="showBoard(board)" :src="firstPinImage(board)"/>
  	</div>
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
        'setCurrentBoardRef'
      ]),
      //Redirect to a specific board
      showBoard: function(board) {
        console.log("Board key", board[".key"])
        console.log("firebaseref", this.getFirebaseDB.ref(board[".key"]))
        this.setCurrentBoardRef(this.getFirebaseDB.ref("/boards/"+board[".key"]))
        this.$router.push('/board')
      },
      //Create a new empty board
      createBoard: function() {
        let updates = {}
        let newBoardKey = this.getFirebaseDB.ref().child('boards/').push().key;
        updates['boards/' + newBoardKey] = {title: 'Untitled board'}
        this.getFirebaseDB.ref().update(updates)
        this.router.push('/boards')
      },
      //Delete the selected board
      deleteBoard: function(board) {
        let updates = {}
        updates['boards/' + board[".key"]] = {}
        this.getFirebaseDB.ref().update(updates)
        this.router.push('/myboards')
      },
      //Display a miniature for the board with the first image in it
      firstPinImage: function(board) {
        for(let pin in board.pins) {
          return board.pins[pin].img
        }
      },
    },

		data: function() {
	    return {
			}
		},
		beforeMount: function() {
      //If not logged in redirect to /signIn
			if(this.authCurrentUser === null) {
					this.$router.push('/signIn')
			}
		}
  }
</script>
