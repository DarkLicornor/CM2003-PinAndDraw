<template>
  <div class="signEmail">
      <div class="foo box">
        <input class="inputText" type="text" name="email" placeholder="Your Email">
      </div>
      <div class="foo box">
        <input class="inputText" type="password" name="pwd" placeholder="Your Password">
      </div>
      <div class="pwd"><input type="checkbox" name="showPwd" value="1">Show password</div>
      <button @click='increment'>Sign in</button>
      <a>Forgot password ?</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'increment',
      'decrement'
    ])
  },
  computed: {
    ...mapGetters({
      count: 'getCount'
    })
  }
}
</script>

<style>
  .signEmail {
    margin: auto;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
  }

  .signEmail button {
    border: none;
    color: white;
    background: rgb(20, 160, 197);
    padding: 0.5em;
    width: 100%;
    cursor: pointer;
    font-size: 1.2em;
    font-family: Panama;
    margin-top: 1em;
  }

  .signEmail button:hover {
    background: #005875;
  }

  .signEmail a {
    margin: 0.5em;
    color: rgb(20, 160, 197);
    font-weight: bold;
    cursor: pointer;
  }

  .inputText {
    -webkit-appearance:none;
    background: white;
    width: 100%;
    border: none;
    position: relative;
    font-size: 1.5em;
    font-family: Panama;
    text-align: center;
    z-index: 3;
  }

.box {
  width: 100%;
  padding: 1em;
  margin: 1em;
  position:relative;
  color: #fff;
  -webkit-transition:0.5s;
  transition: 0.5s;
}

.box::before, .box::after {
  width: 100%;
  height:100%;
  content:'';
  position: absolute;
  top:0;
  left:0;
  -webkit-transform: scale(0);
  transition: 0.5s;
}

.foo {
  border-bottom: 2px solid rgb(20, 160, 197);
}
.foo::before {
  border-left: 2px solid rgb(20, 160, 197);
  -webkit-transform-origin: 0 100%;
}

.foo::after {
  border-right: 2px solid rgb(20, 160, 197);
  border-top: 2px solid rgb(20, 160, 197);
  -webkit-transform-origin: 100% 0%;
}

.box:hover::after, .box:hover::before {
  -webkit-transform: scale(1);
}

.pwd {
  padding: 1em;
  padding-top: 0;
}

.pwd input {
  cursor: pointer;
}

</style>
