<!-- Component managing the selection on Pinterest pictures -->

<template>
  <div class="pinterestPopup">
    <div v-if="showPinterest">
      <template v-if="display == 'boards'">
        <div class="popupBoardsAndPins">
          <Spinner v-if="boards == null" />
          <div v-else class="popupBoard" v-for="board in boards" v-on:click="clickedBoard(board.id)">
            <p>{{ board.name }}</p>
            <div class="popupBoardImg">
              <img :height="board.image.large.height" :src="board.image.large.url"/>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <button @click="backToBoards">Back to boards</button>
        <div class="popupBoardsAndPins">
          <Spinner v-if="pins == null" />
          <div v-else class="popupPins" v-for="(pin, index) in pins" v-on:click="clickedPin(index)" :id="'popupPin'+index">
            <img height="300" :src="pin.image.original.url"/>
          </div>
        </div>
        <button v-if="toAddPins.length !== 0" @click="addToBoard">Add to board</button>
      </template>
    </div>
    <div v-else>
      <p> Your pinterest account is not linked, please link it in your </p>
      <button><router-link to="/account">Account page </router-link></button>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Pinterest from '../../util/pinterest'
  import Spinner from '../Spinner'

  export default {
    computed: {
      ...mapGetters([
        'DBCurrentUser',
        'getFirebaseDB',
        'currentBoard'
      ])
    },
    watch: {
      //Retrieve the pinterest token
			'DBCurrentUser': function() {
				if(this.DBCurrentUser !== null) {
					this.showPinterest = this.DBCurrentUser.pinterestToken ? true : false
          if(this.showPinterest == true) {
            Pinterest.setSession(this.DBCurrentUser.pinterestToken)
            Pinterest.getBoards(this.displayBoards)
          }
				}
			},
		},
		mounted: function() {
      //Retrieve the pinterest token, !duplicate of Watch
			if(this.DBCurrentUser !== null) {
				this.showPinterest = this.DBCurrentUser.pinterestToken ? true : false
        if(this.showPinterest == true) {
          Pinterest.setSession(this.DBCurrentUser.pinterestToken)
          Pinterest.getBoards(this.displayBoards)
        }
      }
		},
    data: () => {return {
      showPinterest: null,
      display: 'boards',
      toAddPins: [],
      boards: null,
      pins: null
    }},
    components: {
      Pinterest,
      Spinner
    },
    methods: {
      ...mapActions([
        'setAddPopupOpen'
      ]),
      //Login and then proceed to display the boards
      login: function() {
        Pinterest.login(this.isLogged)
      },
      isLogged: function(){
        Pinterest.getBoards(this.displayBoards)
      },
      backToBoards: function() {
        this.display = 'boards'
      },
      displayBoards: function(nboards){
        this.boards = nboards.data
      },

      //Get the pins in the board and display them
      clickedBoard: function(id) {
        Pinterest.getPins(id, this.displayPins)
      },
      displayPins: function(nPins){
        this.pins = nPins
        this.display = 'pins'
      },

      //Handle a click on a pin, including style transition
      clickedPin: function(index) {
        let element = document.getElementById("popupPin"+index)
        if(this.toAddPins.indexOf(this.pins[index]) > -1) {
          element.classList.remove("pinSelected")
          this.toAddPins.splice(this.toAddPins.indexOf(this.pins[index]), 1)
        } else {
          element.className += " pinSelected"
          this.toAddPins.push(this.pins[index])
        }
      },

      //Add the pin on firebase
      addToBoard: function() {
        let updates = {}
        this.toAddPins.map((pin) => {
          //Process the data for each pin
          let postData = {}
          let newWidth = pin.image.original.width
          let newHeight = pin.image.original.height
          let ratio

          //Adjust the size to fit a 500 square !This will later be added to other upload types
          if(newWidth > 500 || newHeight > 500) {
            if(newHeight < newWidth){
              ratio = 500/newWidth
              newWidth = 500
              newHeight = newHeight*ratio
            } else {
              ratio = 500/newHeight
              newHeight = 500
              newWidth = newWidth*ratio
            }
          }
          postData = {
            width : newWidth,
            height: newHeight,
            ratio: 1,
            img: pin.image.original.url,
            x: 0,
            y: 0
          }

          //Get the new pin key and push there
          let newPinKey = this.getFirebaseDB.ref().child('boards/' + this.currentBoard[".key"] + '/pins/').push().key;
          updates['boards/' + this.currentBoard[".key"] + '/pins/'+ newPinKey] = postData
        })
        this.getFirebaseDB.ref().update(updates)

        //Close the popup
        this.setAddPopupOpen(false)
      }
    }
  }

</script>
