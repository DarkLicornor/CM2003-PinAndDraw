<template>
  <div class="pinterestPopup">
    <div v-if="showPinterest">
      <template v-if="display == 'boards'">
        <div v-for="board in boards" v-on:click="clickedBoard(board.id)">
          {{ board.name }}
          <img :width="board.image.small.width" :height="board.image.small.height" :src="board.image.small.url"/>
        </div>
      </template>
      <template v-else>
        <div>
          <div v-for="(pin, index) in pins" v-on:click="clickedPin(index)">
            <img :height="300" :src="pin.image.original.url"/>
          </div>
        </div>
      </template>
    </div>
    <div v-else>
      <p> Your pinterest account is not linked, please link it in your </p>
      <button><router-link to="/account">Account page </router-link></button>
      <button @click="loggin">Login</button>
    </div>
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import Pinterest from '../../util/pinterest'

  export default {
    computed: {
      ...mapGetters([
        'DBCurrentUser',
      ])
    },
    watch: {
			'DBCurrentUser': function(){
				console.log(this.DBCurrentUser)
				if(this.DBCurrentUser !== null) {
					this.showPinterest = this.DBCurrentUser.pinterestToken ? true : false
				}
			}
		},
		mounted: function() {
			if(this.DBCurrentUser !== null) {
				this.showPinterest = this.DBCurrentUser.pinterestToken ? true : false
			}
		},
    data: () => {return {
      showPinterest: null,
      display: 'boards',
      boards: [
          {
            name: '',
            image: {
              small: {
                width: 0,
                height: 0,
                url: ''
              }
            }
          }
        ],
      pins: [
        {

        }
      ]
    }},
    components: {
      Pinterest
    },
    methods: {
      ...mapActions([
        'addPin',
      ]),
      loggin: function(){
        Pinterest.login(this.isLogged)
      },
      isLogged: function(){
        console.log('Pinterest.loggedIn()')
        Pinterest.getBoards(this.displayBoards)
      },
      displayBoards: function(nboards){
        this.boards = nboards.data
        console.log('BOARDS', nboards.data)
      },
      clickedBoard: function(id) {
        console.log(id)
        Pinterest.getPins(id, this.displayPins)
      },
      displayPins: function(nPins){
        this.pins = nPins
        console.log('Pins', nPins[0].id, nPins[0].image.original)
        this.display = 'pins'
      },
      clickedPin: function(index) {
        console.log(this.pins[index])
        this.addPin(this.pins[index])
      }
    }
  }

</script>
