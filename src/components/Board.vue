<template>
	<div>
		<h1 class="boardTitle">My Board</h1>
		<BoardMenu />
  		<svg :width="svg.width" :height="svg.height" ref="svg">

        <Pin v-for="(pin, index) in pins" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :ratio="pin.ratio" :height="pin.height" :width="pin.width"></Pin>

      </svg>
      <div v-for="pin in pins">{{pin.img}}</div>
	</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
	import Pin from './Pin.vue'
  import BoardMenu from './BoardMenu.vue'

	export default {
  	data: () => ({
      svg: {
        width: 1280,
        height: 1000
      },
  	}),

    methods: {
      ...mapActions([
        'increment',
        'decrement'
      ])
    },
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
	.boardTitle {
		background: rgb(20, 160, 197);
		padding: 1em;
		padding-left: 2em;
		margin: -1em;
		margin-bottom: 0.5em;
		color: white;
		font-size: 3em;
		font-weight: normal;
	}
</style>
