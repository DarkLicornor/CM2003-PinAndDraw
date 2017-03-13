<template>
	<div class="boardMenu">
     <ul class="boardBar">
       <li class="boardMenuElt"><a>Share</a></li>
       <li class="boardMenuElt"><a>Draw</a></li>
       <li class="boardMenuElt"><a>Pin</a></li>
     </ul>
	</div>
</template>

<style>
   .boardMenu {
	    background: white;
  }

	.boardBar {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		font-weight: bold;
	}

	.boardMenuElt a {
		color: rgb(20, 160, 197) !important;
		padding: 0.4em;
		padding-bottom: 0.5em;
		margin: 0.5em;
		border-bottom: 2px solid #fff133;
	}

	.boardMenuElt a:hover {
		border-bottom: 2px solid #ff0043 !important;
		cursor: pointer;
	}

</style>
