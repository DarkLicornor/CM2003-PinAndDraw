<template>
<div class="loaders-spinnerContainer">
  <div class="spinnerContainer">
    <div class="spinnerLine"></div>
    <div class="spinnerLine"></div>
    <div class="spinnerLine"></div>
    <div class="spinnerLine"></div>
  </div>
</div>

</template>

<style>

.loaders-spinnerContainer {
    padding: 2em;
    margin: 0 auto;
    width: 15em;
    text-align: center;
    font-size: 0;
}
.loaders-spinnerContainer .spinnerContainer {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    padding: 30px;
    width: 25%;
    height: 140px;
}
.spinnerLine {
    position: absolute;
    top: 50%;
    margin-left: -30px;
    width: 60px;
    height: 4px;
    background: rgb(20, 160, 197);
    animation: spin 1.5s infinite ease;
}
.spinnerLine:nth-of-type(2) {
    animation-delay: 0.1s;
}
.spinnerLine:nth-of-type(3) {
    animation-delay: 0.2s;
}
.spinnerLine:nth-of-type(4) {
    animation-delay: 0.3s;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

</style>
