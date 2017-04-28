<template>
  <div class="popup">
    <div class="popupContainer">
      <ul  class="popupMenu">
        <li :style=imageSelected v-on:click="setImage(true)">Image</li>
        <li :style=textSelected v-on:click="setText(true)">Text</li>
      </ul>
      <div class="popupImage" v-if="image">
        <div class="popupImageProviders">
          <img class="notAvailable" src="../assets/images/google.png" />
          <img class="notAvailable" src="../assets/images/instagram.png" />
          <a class="buttonLink" @click="setPinterest">
            <img class="linkAccountImage" src="../assets/images/pinterest.png" />
          </a>
          <img class="notAvailable" src="../assets/images/twitter.png" />
          <img class="notAvailable" src="../assets/images/pinterest.png" />

        </div>
        <div class="popupAddImageUrl">
          <div :style=inputStyle class="foo box">
            <input class="inputText"
              type="text"
              placeholder="Image URL"
              v-model="imageURL">
          </div>
          <button @click="getImageSize">Add image URL </button>
        </div>
        <div class="popupDragAndDrop">
          <DropZone autoProcessQueue="false" ref="dropZoneUpload"/>

          <Spinner v-if="uploadingFile == true" />
          <button v-else @click="upload">Add files</button>
        </div>
      </div>
      <div class="popupPinterest" v-if="pinterest">
        <PinterestSelector />
      </div>
      <div class="popupText" v-if="text">
        <div :style=textAreaDivStyle class="foo box">
           <textarea :style=textAreaStyle class="inputText" v-model="newText"
             type="text"
             placeholder="Your text" />
         </div>
         <button @click="uploadText">Add text</button>
       </div>
    </div>
  </div>
</template>

<script>
  import DropZone from './DropZone'
  import PinterestSelector from './Selectors/PinterestSelector'
  import { mapGetters, mapActions } from 'vuex'
  import Spinner from './Spinner'

	export default {
    methods: {
      getImageSize() {
        if(this.imageURL !== "") {
          let img = new Image()
          let width
          let height
          let callback = this.uploadURL
          img.onload = function() {
            img.width = this.width,
            img.height = this.height
            callback(img)
          },
          img.src = this.imageURL
        } else {
          console.log("url invalid", this.imageURL)
        }
      },
      uploadURL(img) {
          let updates = {}
          let postData = {}
          let newWidth = img.width
          let newHeight = img.height
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
            img: img.src,
            x: 0,
            y: 0
          }

          let newPinKey = this.getFirebaseDB.ref().child('boards/' + this.currentBoard[".key"] + '/pins/').push().key;
          updates['boards/' + this.currentBoard[".key"] + '/pins/'+ newPinKey] = postData
          this.getFirebaseDB.ref().update(updates)
          this.setAddPopupOpen(false)
      },
  		setImage() {
  			this.image = true
        this.text = false
        this.pinterest = false
        this.imageSelected = 'border-bottom: 2px solid #ff0043 !important;'
        this.textSelected = ''
  		},
      setText() {
  			this.text = true
        this.image = false
        this.pinterest = false
        this.textSelected = 'border-bottom: 2px solid #ff0043 !important;'
        this.imageSelected = ''
  		},
      setPinterest() {
        this.pinterest = true
        this.image = false
        this.text = false
        this.imageSelected = 'border-bottom: 2px solid #ff0043 !important;'
        this.textSelected = ''
      },
      uploadText() {
        if(this.newText !== "") {
          let newNoteKey = this.getFirebaseDB.ref().child('boards/' + this.currentBoard[".key"] + '/notes').push().key
          let updates = {}
          updates['boards/' + this.currentBoard[".key"] + '/notes/'+ newNoteKey] = {
            height: 500,
            width: 200,
            text: this.newText,
            x: 0,
            y: 0
          }
          console.log("newText", updates)

          this.getFirebaseDB.ref().update(updates)
          this.setAddPopupOpen(false)
          

        }
      },
      upload() {
        let context = this

        let updates = {}
        //For each image in the upload queue, upload it then save it in DB
        for(let index in this.uploadQueue){
          let file = this.uploadQueue[index]
          //Generate a random number for file ID
          let GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
              return v.toString(16);
          });
          //Get the file extension (jpg, png, ...)
          let fileExtension = file.name.substr(file.name.lastIndexOf('.')+1)

          //Upload the image
          let uploadTask = this.getFirebaseStorage.ref().child(file.name+GUID+'.'+fileExtension).put(file)

          uploadTask.on('state_changed', function(snapshot){
            //During upload
            context.uploadingFile = true

          }, function(error){
            //On error
            console.log('Upload Error')

          }, function() {
            //Upload successful
            console.log('Uploaded a file!');
            context.uploadingFile = false
            let newPinKey = context.getFirebaseDB.ref().child('boards/' + context.currentBoard[".key"] + '/pins').push().key

            updates['boards/' + context.currentBoard[".key"] + '/pins/'+ newPinKey] = {
              height: file.height,
              width: file.width,
              img: uploadTask.snapshot.downloadURL,
              x: 0,
              y: 0
            }
            context.getFirebaseDB.ref().update(updates)
          })
        }
        //Empty the upload queue
        this.clearUploadQueue()
        //Empty the thumbnails on the dropZone component1
        this.$refs.dropZoneUpload.$refs.dropZoneComponent.removeAllFiles()
      },
      ...mapActions([
        'clearUploadQueue',
        'addFileToUploadQueue',
        'setAddPopupOpen'
      ])
  	},

    computed: {
      ...mapGetters([
        'getFirebaseDB',
        'getFirebaseStorage',
        'uploadQueue',
        'currentBoard'
      ])
    },
    mounted: function() {
      console.log('currentBoard', this.currentBoard[".key"])
    },
    data: function() {
      return {
        newText: "",
        imageURL: "",
        uploadingFile: false,
        image: true,
        text: false,
        pinterest : false,
        imageSelected:'border-bottom: 2px solid #ff0043 !important;',
        textSelected: '',
        inputStyle: 'width: 70%; margin: 2em;',
        textAreaDivStyle: 'height: 20em; width: 80%; margin: auto; margin-top: 2em;margin-bottom: 2em;',
        textAreaStyle: 'height: 100%;'
      }
    },
    components: {
      DropZone,
      PinterestSelector,
      Spinner
    },
  }
</script>
