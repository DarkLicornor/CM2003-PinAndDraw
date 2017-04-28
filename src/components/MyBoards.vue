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

<style>
.miniBoard img {
  width: 100%;
  margin: auto;
}
.myBoards {
	width: 70%;
	margin: auto;
	text-align: center;
  margin-top: 3em;
}

.myBoards .createButton {
    padding: 1em;
    border: none;
    background: #14a0c5;
    color: white;
    font-family: Panama;
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 1em;
    cursor: pointer;
}

.myBoards .createButton:hover {
	background-color: #08627a;
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
  overflow: hidden;
  color: white;
}

.miniBoard:hover {
	background-color: #fff133;
  color: black;
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
        this.getFirebaseDB.ref('boards/'+newBoardKey).on('value', (snap) => {
          this.showBoard(snap.val())
        })
      },
      firstPinImage: function(board) {

        for(let pin in board.pins) {
          console.log('img', board, pin, board.pins[pin].img)
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
