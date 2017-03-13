<template>
	<div style="height:100vh;">
		<h1>Board</h1>
      <div id="canvas" width="800px" height="800px" style="width: 800px; height: 800px;"></div>
  		<!-- <svg :width="svg.width" :height="svg.height" ref="svg">

        <Pin v-for="(pin, index) in pins" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :ratio="pin.ratio" :height="pin.height" :width="pin.width"></Pin>
      
      </svg>
      <div v-for="pin in pins">{{pin.img}}</div> -->
      <!-- <Pin v-for="(pin, index) in pins" :pinid="index" :title="pin.title" :x="pin.x" :y="pin.y" :img="pin.img" :ratio="pin.ratio" :height="pin.height" :width="pin.width"></Pin> -->
	</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Pin from './Pin.vue'
  //import Raphael from 'webpack-raphael'

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

    mounted: function() {
      var R = Raphael("canvas", 500, 500);    
      var c = R.circle(100, 100, 50).attr({
          fill: "hsb(.8, 1, 1)",
          stroke: "none",
          opacity: .5
      });
      var start = function () {
          // storing original coordinates
          this.ox = this.attr("cx");
          this.oy = this.attr("cy");
          this.attr({opacity: 1});
      },
      move = function (dx, dy) {
          // move will be called with dx and dy
          this.attr({cx: this.ox + dx, cy: this.oy + dy});
      },
      up = function () {
          // restoring state
          this.attr({opacity: .5});
      };
      c.drag(move, start, up);
    }
  }
</script>