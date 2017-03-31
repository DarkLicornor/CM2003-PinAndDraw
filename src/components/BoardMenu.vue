<!-- Component managing the menu in the board -->
<template>
	<div class="boardMenuContainer">
		<ul class="hList">
		  <li>
		    <a href="#click" class="boardMenu">
					<img class="boardMenuImage" src="../assets/images/plus.png" alt="logo">
		      <ul class="boardMenu-dropdown">
		        <li @click="openPopup">Image</li>
		        <li>Text</li>
		        <li>Drawing</li>
		      </ul>
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
