<template>
	<div style="height:100vh;">
		<h1>Board</h1>
  		<svg :width="svg.width" :height="svg.height" ref="svg">

        <Pin v-for="(pin, index) in pins" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :ratio="pin.ratio" :height="pin.height" :width="pin.width"></Pin>
      
      </svg>
      <div v-for="pin in pins">{{pin.img}}</div>
	</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Pin from './Pin.vue'

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
      Pin
    },
  }
</script>