<!--
Component displaying a board wich contain pins
 -->

<template>
	<div>
    <div :style=backgroundStyle v-on:click.self="setAddPopupOpen(false)" v-if="isAddPopupOpen">
    	<Popup />
    </div>
		<div class="head">
			<input v-model="newBoardTitle" type="text" />
			<BoardMenu />
  	</div>
  	<div id="boardToCapture">
      <p v-if="pinsList == undefined && notesList == undefined"> Click on "+" to add your first pin, and on your board name to rename it</p>
			<div v-else-if="pinsList !== null || notesList !== null" class="resize-container">
        <img class="boardMenuDelete" src="../assets/images/recyclebin-icon.png" alt="logo">
        
				<Pin v-if="pinsList !== null" v-for="(pin, index) in pinsList" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :height="pin.height" :width="pin.width"></Pin>
				<Note v-if="notesList !== null" v-for="(note, index) in notesList" :noteid="index" :title="note.title" :x="note.x" :y="note.y" :text="note.text" :height="note.height" :width="note.width"></Note>
			</div>
			<Spinner v-else />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
	import Pin from './Pin'
	import Note from './Note'
	import BoardMenu from './BoardMenu'
  import Popup from './Popup'
	import Spinner from './Spinner'
	import html2canvas from 'html2canvas'

	export default {
    data: function (){
      return {
        pinsList: null,
        interval: null
      }
    },
    computed: {
      ...mapGetters([
				'authCurrentUser',
        'isAddPopupOpen',
        'getFirebaseAuth',
        'getFirebaseDB',
				'getFirebaseStorage',
        'getState',
				'currentBoard'
      ]),
			notesList() {
				console.log("notes", this.currentBoard.notes)
				return this.currentBoard.notes
			},
			pinsList() {
				console.log("pins ???", this.currentBoard.pins)
				return this.currentBoard.pins
			},
    },
		mounted: function() {
      //Redirect if the user is not logged in
			if(this.authCurrentUser === null) {
				this.$router.push('/signIn')
			}
      if(this.currentBoard == null){
        this.$router.push('/boards')
      }
      //Initialise the board name
			this.newBoardTitle = this.currentBoard ? this.currentBoard.title : 'Untitled board'
			let context = this
		},
		methods: {
      pinsList() {
        console.log("pins", this.currentBoard.pins)
        return this.currentBoard.pins
      },
			...mapActions([
				'setAddPopupOpen'
			]),
		},
		watch: {
      //Get the board title
			'newBoardTitle': function(val, oldVal) {
				let updates = {}
				updates['boards/' + this.currentBoard[".key"] + '/title' ] = val
				this.getFirebaseDB.ref().update(updates)
			},

      //Display or hide the popup to add pins depending on the state
			isAddPopupOpen: function(){
				if(this.isAddPopupOpen !== null) {
					this.backgroundStyle = this.isAddPopupOpen == true
					? "background: rgba(0,0,0,0.4); position: fixed; z-index: 99; top: 0; left: 0; bottom:0; right: 0; display: flex; cursor: pointer;"
					: ''
				}
			}
		},
		data: function() {
			return {
				uploadingFile: false,
				captureScreen: null,
				newBoardTitle: 'Untitled board',
				backgroundStyle: this.isAddPopupOpen == true
				? "background: rgba(0,0,0,0.4); position: absolute; top: 0; left: 0; bottom:0; right: 0; display: flex; cursor: pointer;"
				: ''
			}
		},
    components: {
      Pin,
			Note,
			Popup,
			BoardMenu,
			Spinner,
			html2canvas
    },
  }
</script>
