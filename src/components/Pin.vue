<!--
Component displaying one picture, and allowing to drag and resize it
The drag and resize is temporary and is currently not stored on the flux State
 -->

<template>
<!-- <img :src="img" class="resize-drag" :style="coordinates"/> -->
  <img :src="img" class="resize-drag" :style="style" :data-x="x" :data-y="y" :data-pinid="pinid" :width="width" :height="height"/>

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

    props: ['pinid', 'title', 'x', 'y', 'img', 'width', 'height'],

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
      interact('.resize-drag')
        .draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 1, bottom: 1, right: 1 }
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


          // update the coordinates on firebase (in case top left corner used)
          let pinid = target.getAttribute('data-pinid')
          let updates = {}
          updates['/boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/x/'] = x
          updates['/boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/y/'] = y

          // update the resize on firebase
          updates['/boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/width/'] = event.rect.width
          updates['/boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/height/'] = event.rect.height
          context.getFirebaseDB.ref().update(updates)
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
      let pinid = target.getAttribute('data-pinid')
      let updates = {}
      updates['/boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/x/'] = x
      updates['/boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/y/'] = y
      context.getFirebaseDB.ref().update(updates)
    }

    //Handle drag and drop to delete a pin
    interact('.boardMenuDelete').dropzone({
      // only accept elements matching this CSS selector
      accept: '.resize-drag',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.001,

      // listen for drop related events:

      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        draggableElement.textContent = 'Dragged in';
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.textContent = 'Dragged out';
      },
      ondrop: function (event) {
        console.log("dropped")
        let pinid = event.relatedTarget.getAttribute('data-pinid')
        console.log(context.currentBoard)
        context.getFirebaseDB.ref("/boards/"+context.currentBoard[".key"]+"/pins/"+pinid).remove()
        event.relatedTarget.textContent = 'Dropped';
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
      }
    });
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

  /* This makes things *much* easier */
  box-sizing: border-box;
}

.drop-active {
  opacity: 0.2;
}
.can-drop {
  opacity: 0.5;
}
</style>
