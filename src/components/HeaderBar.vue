<!--
Component Display the header of the web-App, with navigation menu.
 -->

<template>
	<div class="headerBar">
		<img src="../assets/images/logo-500.png" alt="logo">
     <ul class="menu">
       <li class="menuHeader"><router-link to="/board">My board</router-link></li>
       <li class="menuHeader"><router-link to="/signIn">Sign in</router-link></li>
			 <li class="menuHeader"><router-link to="/signUp">Sign Up</router-link></li>
       <li class="menuHeader"><router-link to="/account">My Account</router-link></li>
       <li class="menuHeader"><router-link to="/about">About</router-link></li>
     </ul>
	</div>
</template>
