<template>
  <div>
    <dropzone
      id="myVueDropzone"
      url="https://httpbin.org/post"
      v-on:vdropzone-success="showSuccess">
    </dropzone>
  </div>
</template>

<script>
  import Dropzone from 'vue2-dropzone'

  export default {
    name: 'MainApp',
    components: {
      Dropzone
    },
    methods: {
      'showSuccess': function (file) {
        console.log('A file was successfully uploaded', file)
      }
    }
  }
</script>
