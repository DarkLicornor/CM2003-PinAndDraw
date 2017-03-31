<template>
  <div class="popupBackground" style={{backgroundStyle}}>
  </div>
</template>

<style>
  .popupBackground: {
    background-color: rgba(0, 0, 0, 0.4);)
  }
</style>

<script>
  export default {
    data: function() {
      backgroundStyle: ''
    },
    mounted: function() {
      this.backgroundStyle = "width:" + window.innerWidth + "px; height:" + window.innerHeight + "px;"
      console.log("w+h", this.backgroundStyle)
    }
  }
</script>
