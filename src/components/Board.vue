<!--
Component displaying a board wich contain getPins
 -->

<template>
	<div>
    <div :style=backgroundStyle v-on:click.self="setAddPopupOpen(false)" v-if="isAddPopupOpen">
    	<Popup />
    </div>
		<div class="head">
			<h1 class="boardTitle">My Board</h1>
			<BoardMenu />
  	</div>
  	<div class="resize-container">
			<Spinner v-if="pinsList == null" />
      <Pin v-else v-for="(pin, index) in pinsList" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :height="pin.height" :width="pin.width"></Pin>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
	import Pin from './Pin'
	import BoardMenu from './BoardMenu'
  import Popup from './Popup'
	import Spinner from './Spinner'

	export default {
    computed: {
      pinsList() {
        let value = this.getPins
        delete value[".key"]
        return value
        // let value = delete this.getPins['.key']
        // return value;
      },
      ...mapGetters([
				'authCurrentUser',
        'isAddPopupOpen',
        'getFirebaseAuth',
        'getFirebaseDB',
        'getPins',
        'getState'
      ])
    },
		mounted: function() {
			if(this.authCurrentUser === null) {
					this.$router.push('/signIn')
				}
				console.log("pinlist0", this.pinsList)
		},
		methods: {
			...mapActions([
				'setAddPopupOpen'
			])
		},
		watch: {
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
				backgroundStyle: this.isAddPopupOpen == true
				? "background: rgba(0,0,0,0.4); position: absolute; top: 0; left: 0; bottom:0; right: 0; display: flex; cursor: pointer;"
				: ''
			}
		},
    components: {
      Pin,
			Popup,
			BoardMenu,
			Spinner
    },
  }
</script>

<style>

.resize-container {
  height: 87vh;
}

</style>
