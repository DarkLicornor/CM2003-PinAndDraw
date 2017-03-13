<template>
	<div class="headerBar">
     <ul class="menu">
       <li class="menuHeader"><router-link to="/board">MY BOARD</router-link></li>
       <li class="menuHeader"><router-link to="/signIn">SIGN IN</router-link></li>
       <li class="menuHeader"><router-link to="/signUp">Sign Up</router-link></li>
       <li class="menuHeader"><router-link to="/about">About</router-link></li>
     </ul>
	</div>
</template>

<style>
   .headerBar {
	    background: rgb(20, 160, 197);
			padding: 1em;
			margin: -1em;
  }

	.menu {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		font-size: 1.3em;
		font-weight: bold;
	}

	.menuHeader a {
		color: white !important;
		padding: 0.4em;
		padding-bottom: 0.5em;
		margin: 0.5em;
		border-bottom: 2px solid #fff133;
	}

	.menuHeader a:hover {
		border-bottom: 2px solid #ff0043 !important;
	}

</style>
