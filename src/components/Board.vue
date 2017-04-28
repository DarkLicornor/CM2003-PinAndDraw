<!--
Component displaying a board wich contain getPins
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
    // created: function() {
    //   var self = this
    //   this.interval = setInterval(function () {
    //     console.log("updated")
    //     self.pinsList = self.currentBoard.pins
    //     self.$forceUpdate()
    //   }, 1000)
    // },
    // beforeDestroy: function() {
    //   clearInterval(this.interval)
    // },
		mounted: function() {
			if(this.authCurrentUser === null) {
				this.$router.push('/signIn')
			}
			console.log('new list', this.notesList, this.currentBoard.notes)
			this.newBoardTitle = this.currentBoard ? this.currentBoard.title : 'Untitled board'
			let context = this

			// this.captureScreen = setTimeout(() => {
	    // 	html2canvas(document.getElementById("boardToCapture"), {
	    //     onrendered: function (canvas) {
			// 			let dataURI = canvas.toDataURL()
			// 			let binary = atob(dataURI.split(',')[1]);
			// 	    let array = [];
			// 	    for(let i = 0; i < binary.length; i++) {
			// 	        array.push(binary.charCodeAt(i));
			// 	    }
			// 	    let image = new Blob([new Uint8Array(array)], {type: 'image/png'});
			//
			//
			//         let updates = {}
			//
			//           //Upload the image
			//           let uploadTask = context.getFirebaseStorage.ref().child('screenshot'+context.currentBoard[".key"]+'png').put(image)
			//
			//           uploadTask.on('state_changed', function(snapshot){
			//             //During upload
			//             context.uploadingFile = true
			//           }, function(error){
			//             //On error
			//             console.log('Upload Error')
			//           }, function() {
			//             //Upload successful
			//             // console.log('Uploaded a file!');
			//             context.uploadingFile = false
			// 						// console.log("image", image)
			// 						updates['boards/' + context.currentBoard[".key"] + '/miniBoard' ] = uploadTask.snapshot.downloadURL
			// 						// console.log("updates", updates)
			// 						context.getFirebaseDB.ref().update(updates)
			//           })
		  //         },
	    //     	})
			// }, 2000)
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
			'newBoardTitle': function(val, oldVal) {
				let updates = {}
				updates['boards/' + this.currentBoard[".key"] + '/title' ] = val
				this.getFirebaseDB.ref().update(updates)
			},
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
