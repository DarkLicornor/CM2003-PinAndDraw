<!--
Component displaying one picture, and allowing to drag and resize it
The drag and resize is temporary and is currently not stored on the flux State
 -->

<template>
<!-- <img :src="img" class="resize-drag" :style="coordinates"/> -->
  <img :src="img" class="resize-drag" :style="style"/>

  <!-- SVG is not used anymore, but might be used again
  <svg :x="x" :y="y" :width="cWidth" :height="cHeight" :id="pinid" ref="pinsvg">
    <rect x="0" y="0" width="100%" height="100%" rx="3" ry="3"/>
    <image x="0" y="0" width="100%" height="100%" :xlink:href="img"/>
  </svg> -->
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import interact from 'interact.js'

  export default {
    components: { interact },

    props: ['pinid', 'title', 'x', 'y', 'img', 'ratio', 'width', 'height'],

    computed: {
      cWidth() {
        return this.width * this.ratio
      },
      cHeight() {
        return this.height * this.ratio
      },
      coordinates() {
        return "transform: translate("+ this.x +"px, "+ this.y +"px);"
      },
      style() {
        return "width: "+ this.cWidth +";height: "+ this.cHeight +"; transform: translate("+ this.x +"px, "+ this.y +"px);"

      }
    },

    methods: {
      ...mapActions([
        'dragPin',
      ])
    },

    mounted: function() {

      //Add the "interact.js" listenners for drag and resize events.
      interact('.resize-drag')
        .draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          },
          // enable autoScroll
          autoScroll: true,

          // call this function on every dragmove event
          onmove: dragMoveListener,
          // call this function on every dragend event
          onend: function (event) {
            var textEl = event.target.querySelector('p');

            textEl && (textEl.textContent =
              'moved a distance of '
              + (Math.sqrt(event.dx * event.dx +
                           event.dy * event.dy)|0) + 'px');
          }
        })
        .resizable({
          preserveAspectRatio: true,
          edges: { left: false, right: true, bottom: true, top: false }
        })
        .on('resizemove', function (event) {
          var target = event.target,
              x = (parseFloat(target.getAttribute('data-x')) || 0),
              y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width  = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
        });

    function dragMoveListener (event) {


        //if(moved){
          var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        // } else {
        //   var target = event.target,
        //   x = startX,
        //   y = startY;
        // }

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
    }
  }
</script>

<style>
.resize-drag {
  background-color: #29e;
  color: white;
  font-size: 20px;
  font-family: sans-serif;
  border-radius: 8px;
  position: absolute;
  z-index: 0;
  width: 120px;

  /* This makes things *much* easier */
  box-sizing: border-box;
}
</style>
