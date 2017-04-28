<!-- Component that allow the user to see his boards -->
<template>
  <div class="myBoards">
  	<h2>My Boards</h2>
    <button class="createButton" @click="createBoard">Create a board</button>
    <p> or select one : </p>
  	<div class="listBoards">
      <Spinner v-if="boardsList == null" />
      <div @click="showBoard(board)" class="miniBoard" v-else v-for="(board, index) in boardsList">
        <p>{{board.title}}</p>
        <img :src="firstPinImage(board)"/>
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
      showBoard: function(board) {
        console.log("Board key", board[".key"])
        console.log("firebaseref", this.getFirebaseDB.ref(board[".key"]))
        this.setCurrentBoardRef(this.getFirebaseDB.ref("/boards/"+board[".key"]))
        this.$router.push('/board')
      },
      createBoard: function() {
        let updates = {}
        let newBoardKey = this.getFirebaseDB.ref().child('boards/').push().key;
        updates['boards/' + newBoardKey] = {title: 'Untitled board'}
        this.getFirebaseDB.ref().update(updates)
        this.router.push('/myboards')
      },
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
			if(this.authCurrentUser === null) {
					this.$router.push('/signIn')
			}
		}
  }
</script>
