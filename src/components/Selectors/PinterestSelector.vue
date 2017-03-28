<template>
  <div>
    <button @click="loggin">Loggin</button>
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
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import Pinterest from '../../util/pinterest';

  export default {
    data: () => {return {
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
        console.log(Pinterest.loggedIn())
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