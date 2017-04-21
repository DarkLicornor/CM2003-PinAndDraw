<template>
  <div class="popup">
    <ul  class="popupMenu">
      <li :style=imageSelected v-on:click="setImage(true)">Image</li>
      <li :style=textSelected v-on:click="setText(true)">Text</li>
    </ul>
    <div class="popupImage" v-if="image">
      <div class="popupImageProviders">
        <a class="buttonLink" @click="setPinterest">
          <img class="linkAccountImage" src="../assets/images/pinterest.png" />
        </a>
      </div>
      <div :style=inputStyle class="foo box">
        <input class="inputText"
          type="text"
          placeholder="Image URL">
      </div>
      <div class="popupDragAndDrop">
        <img src="../assets/images/upload.png">
        <p> Just drag and drop your file here </p>
        <p> or click anywhere to explore </p>
      </div>
    </div>
    <div class="popupPinterest" v-if="pinterest">
      <p>Select the pin you want to import</p>
    </div>
    <div class="popupText" v-if="text">
      <div :style=textAreaDivStyle class="foo box">
        <textarea :style=textAreaStyle class="inputText"
          type="text"
          placeholder="Your text" />
      </div>
    </div>
    <button>Add to board</button>
  </div>
</template>

<script>
	export default {
    methods: {
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
      }
  	},
  data: function() {
    return {
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
}
</script>
