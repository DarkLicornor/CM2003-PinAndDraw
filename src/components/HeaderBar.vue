<template>
	<div class="headerBar">
		<img src="../assets/images/logo-500.png" alt="logo">
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
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
  }

	.headerBar img {
		margin-left: 5em;
		width: 12%;
		height: 12%;
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
