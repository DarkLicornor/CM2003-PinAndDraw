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
      login: function() {
        Pinterest.login(this.isLogged)
      },
      isLogged: function(){
        Pinterest.getBoards(this.displayBoards)
      },
      displayBoards: function(nboards){
        this.boards = nboards.data
        // console.log('BOARDS images2', nboards.data[0].image)
      },
      clickedBoard: function(id) {
        Pinterest.getPins(id, this.displayPins)
      },
      displayPins: function(nPins){
        this.pins = nPins
        // console.log('Pins', nPins, nPins[0].id, nPins[0].image.original)
        this.display = 'pins'
      },
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
      addToBoard: function() {
        let updates = {}
        this.toAddPins.map((pin) => {
          let postData = {}
          let newWidth = pin.image.original.width
          let newHeight = pin.image.original.height
          console.log('before change', newWidth, newHeight)
          let ratio
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

          let newPinKey = this.getFirebaseDB.ref().child('boards/' + this.currentBoard[".key"] + '/pins/').push().key;
          updates['boards/' + this.currentBoard[".key"] + '/pins/'+ newPinKey] = postData
        })
        this.getFirebaseDB.ref().update(updates)
        this.setAddPopupOpen(false)
      }
    }
  }

</script>
