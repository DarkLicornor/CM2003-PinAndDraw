<!--
Component displaying a board wich contain pins
 -->

<template>
	<div>
		<div class="head">
			<h1 class="boardTitle">My Board</h1>
			<BoardMenu />
  	</div>
  	<div class="resize-container">

      <Pin v-for="(pin, index) in pins" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :ratio="pin.ratio" :height="pin.height" :width="pin.width"></Pin>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
	import Pin from './Pin.vue'
  import BoardMenu from './BoardMenu.vue'

	export default {
    computed: {
      ...mapGetters({
        pins: 'getPins'
      })
    },

    components: {
      Pin,
			BoardMenu
    },
  }
</script>

<style>
	.head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}
	.boardTitle {
		background: white;
		/*padding: 1em;*/
		padding-left: 1em;
		/*margin-bottom: 0.5em;*/
		color: rgb(20, 160, 197);
		font-size: 3em;
		font-weight: normal;
	}
  .resize-container {
    width: 100%;
    height: 240px;
  }
</style>
