<!-- Component displaying one picture, and allowing to drag and resize it -->

<template>
  <img :src="img" class="resize-drag element" :style="style" :data-x="x" :data-y="y" :data-pinid="pinid" :width="width" :height="height"/>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import interact from 'interact.js'

  export default {
    components: { interact },

    props: ['pinid', 'title', 'x', 'y', 'img', 'width', 'height'],

    methods: {
      ...mapActions([
        'deletePin'
      ])
    },

    computed: {
      coordinates() {
        return "transform: translate("+ this.x +"px, "+ this.y +"px);"
      },
      style() {
        return "width: "+ this.width +"; height: "+ this.height +"; " + this.coordinates;
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
          }
        })
        .resizable({
          preserveAspectRatio: true,
          edges: { left: false, right: true, bottom: true, top: false }
        })
        .on('resizemove', function (event) {
          //When resizing
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

          let pinid = target.getAttribute('data-pinid')
          if(pinid !== null && pinid !== undefined) {
            let updates = {}
            // update the coordinates on firebase (in case top left corner used)
            updates['boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/x/'] = x
            updates['boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/y/'] = y

            // update the resize on firebase
            updates['boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/width/'] = event.rect.width
            updates['boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/height/'] = event.rect.height
            context.getFirebaseDB.ref().update(updates)
          }
        });

    function dragMoveListener (event) {
      var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);

      // update the coordinates on firebase
      let pinid = target.getAttribute('data-pinid')
      if(pinid !== null && pinid !== undefined) {

        let updates = {}
        updates['boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/x/'] = x
        updates['boards/' + context.currentBoard[".key"] + '/pins/'+pinid+'/y/'] = y
        context.getFirebaseDB.ref().update(updates)
      }
    }

    //Handle drag and drop to delete a pin
    interact('.boardMenuDelete').dropzone({
      // only accept elements matching this CSS selector
      accept: '.element',
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
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
      },
      ondrop: function (event) {
        let pinid = event.relatedTarget.getAttribute('data-pinid')
        if(pinid == null){
          //This is a note pin
          let noteid = event.relatedTarget.getAttribute('data-noteid')
          context.getFirebaseDB.ref("/boards/"+context.currentBoard[".key"]+"/notes/"+noteid).remove()
          event.relatedTarget.classList.remove('can-drop');

        } else {
          //This is an image pin
          context.getFirebaseDB.ref("/boards/"+context.currentBoard[".key"]+"/pins/"+pinid).remove()
          event.relatedTarget.classList.remove('can-drop');
        }
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