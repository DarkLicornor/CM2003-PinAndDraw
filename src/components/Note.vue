<!--
Component displaying one picture, and allowing to drag and resize it
The drag and resize is temporary and is currently not stored on the flux State
 -->

<template>
<!-- <img :src="img" class="resize-drag" :style="coordinates"/> -->
  <div class="resize-dragNote" :style="style" :data-x="x" :data-y="y" :data-noteid="noteid" :width="width" :height="height">
    <p>{{text}}</p>
  </div>

  <!-- SVG is not used anymore, but might be used again
  <svg :x="x" :y="y" :width="cWidth" :height="cHeight" :id="noteid" ref="notesvg">
    <rect x="0" y="0" width="100%" height="100%" rx="3" ry="3"/>
    <image x="0" y="0" width="100%" height="100%" :xlink:href="img"/>
  </svg> -->
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import interact from 'interact.js'

  export default {
    components: { interact },

    props: ['noteid', 'title', 'x', 'y', 'text', 'width', 'height'],

    computed: {
      coordinates() {
        return "transform: translate("+ this.x +"px, "+ this.y +"px);"
      },
      style() {
        return "width: "+ this.width +"; height: "+ this.height +"; transform: translate("+ this.x +"px, "+ this.y +"px);"
      },
      ...mapGetters([
        'getFirebaseDB',
        'currentBoard'
      ])
    },
      mounted: function() {
      let context = this

      //Add the "interact.js" listenners for drag and resize events.
      interact('.resize-dragNote')
        .draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 1, left: 0, bottom: 0, right: 0 }
          },
          // enable autoScroll
          autoScroll: true,

          // call this function on every dragmove event
          onmove: dragMoveListener,
          // call this function on every dragend event
          onend: function (event) {
            var textEl = event.target.querySelector('p');

            // textEl && (textEl.textContent =
            //   'moved a distance of '
            //   + (Math.sqrt(event.dx * event.dx +
            //                event.dy * event.dy)|0) + 'px');
          }
        })
        .resizable({
          preserveAspectRatio: false,
          edges: { left: true, right: true, bottom: true, top: true }
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
          // target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);


          // update the coordinates on firebase (in case top left corner used)
          let noteid = target.getAttribute('data-noteid')
          if(noteid !== null && noteid !== undefined) {
            let updates = {}
            updates['boards/' + context.currentBoard[".key"] + '/notes/'+noteid+'/x/'] = x
            updates['boards/' + context.currentBoard[".key"] + '/notes/'+noteid+'/y/'] = y

            // update the resize on firebase
            updates['boards/' + context.currentBoard[".key"] + '/notes/'+noteid+'/width/'] = event.rect.width
            updates['boards/' + context.currentBoard[".key"] + '/notes/'+noteid+'/height/'] = event.rect.height
            context.getFirebaseDB.ref().update(updates)
          }

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

      // update the coordinates on firebase
      let noteid = target.getAttribute('data-noteid')
      if(noteid !== null && noteid !== undefined) {
        let updates = {}
        updates['boards/' + context.currentBoard[".key"] + '/notes/'+noteid+'/x/'] = x
        updates['boards/' + context.currentBoard[".key"] + '/notes/'+noteid+'/y/'] = y
        context.getFirebaseDB.ref().update(updates)
      }
    }
  }
}
</script>
