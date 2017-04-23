<template>
  <div>
    <dropzone
      id="myVueDropzone"
      url="https://httpbin.org/post"
      v-on:vdropzone-success="fileAdded"
      v-on:vdropzone-removed-file="fileRemoved"
      ref="dropZoneComponent">
    </dropzone>
  </div>
</template>

<script>
  import Dropzone from 'vue2-dropzone'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'MainApp',
    components: {
      Dropzone
    },
    methods: {
      'fileAdded': function (file) {
        this.addFileToUploadQueue(file)
        console.log('A file was successfully added to the list', file)
      },
      'fileRemoved': function (file, error, xhr) {
        this.removeFileFromUploadQueue(file)
        console.log('A file was successfully removed from the list', file)
      },
      ...mapActions([
        'addFileToUploadQueue',
        'removeFileFromUploadQueue'
      ])
    }
  }
</script>
