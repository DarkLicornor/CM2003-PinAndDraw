<template>
  <div>
    <button @click="loggin">Loggin</button>
      <div v-if="token != null" v-for="(picture, index) in pictures" v-on:click="clickedPicture(index)">
        <img :width="picture.images.standard_resolution.width" :height="picture.images.standard_resolution.height" :src="picture.images.standard_resolution.url"/>
      </div>
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import Instagram from '../../util/instagram'

  export default {
    data: () => { return {
      token: null,
      pictures: [
          {
          },
    ]}},
    components: {
      Instagram
    },
    methods: {
      ...mapActions([
        'addPin',
      ]),
      loggin: function(){
        Instagram.login(this.isLogged)
      },
      isLogged: function(token){
        this.token = token
        Instagram.getPictures(this.token, this.displayPictures)
      },
      displayPictures: function(pictures){
        this.pictures = pictures.data
        console.log('Pictures', this.pictures)
      },
      clickedPicture: function(index) {
        console.log(this.pictures, index)
        console.log(this.pictures[index])
        this.addPin(this.pictures[index])
      }
    }
  }

</script>