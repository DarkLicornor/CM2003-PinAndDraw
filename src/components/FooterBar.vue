<template>
	<div class="footerBar">
		<h4>Alexa NOËL - Florian PEYRON - Jean-Gabriel FISHBACH</h4>
		<h5>For any questions contact us at 1605619@rgu.ac.uk</h5>
	</div>
</template>

<style>
   .footerBar {
	    background: rgb(20, 160, 197);
			padding: 0.1em;
			margin: -1em;
			margin-top: 0.2em;
			text-align: center;
			left:0;
			bottom:0;;
  }


* html .footer {
	position:absolute;
	top:expression((0-(footer.offsetHeight)+(document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight)+(ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop))+'px');
}

</style>
