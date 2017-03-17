<template>
  <svg :x="x" :y="y" :width="cWidth" :height="cHeight" :id="pinid" ref="pinsvg">
    <rect x="0" y="0" width="100%" height="100%" rx="3" ry="3"/>
    <image x="0" y="0" width="100%" height="100%" :xlink:href="img"/>
  </svg>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: ['pinid', 'title', 'x', 'y', 'img', 'ratio', 'width', 'height'],

    computed: {
      cWidth() {
        return this.width * this.ratio
      },
      cHeight() {
        return this.height * this.ratio
      },
    },

    methods: {
      ...mapActions([
        'dragPin',
      ])
    },

    mounted: function() {
    }
  }
</script>