<!-- Component managing the menu in the board -->
<template>
	<div class="boardMenuContainer">
		<ul class="hList">
		  <li>
		    <a  v-on:click="setAddPopupOpen(true)" href="#click" class="boardMenu">
					<img  class="boardMenuImage" src="../assets/images/plus.png" alt="logo">
		    </a>
		  </li>
			<li>
		    <a href="#click" class="boardMenu">
					<img class="boardMenuImage" src="../assets/images/share.png" alt="logo">
		      <ul class="boardMenu-dropdown">
		        <li>Facebook</li>
		        <li>Twitter</li>
		        <li>Link</li>
		      </ul>
		    </a>
		  </li>
		</ul>
	</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions([
        'setAddPopupOpen',
      ])
    }
  }
</script>
