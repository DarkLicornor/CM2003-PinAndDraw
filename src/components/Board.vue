<!--
Component displaying a board wich contain getPins
 -->

<template>
	<div>
    <div v-if="isAddPopupOpen">
      AddPopupOpen
    </div>
		<div class="head">
			<h1 class="boardTitle">My Board</h1>
			<BoardMenu />
  	</div>
  	<div class="resize-container">
      <Pin v-for="(pin, index) in getPins" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :ratio="pin.ratio" :height="pin.height" :width="pin.width"></Pin>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
	import Pin from './Pin.vue'
  import BoardMenu from './BoardMenu.vue'

	export default {
    computed: {
      ...mapGetters([
				'authCurrentUser',
      	'getPins',
        'isAddPopupOpen'
      ])
    },
    components: {
      Pin,
			BoardMenu
    },
  }
</script>
