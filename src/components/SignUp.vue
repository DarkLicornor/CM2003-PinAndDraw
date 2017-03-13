<template>
  <div class="signEmail">
      <div class="foo box">
        <input class="inputText" type="text" name="email" placeholder="Your Email">
      </div>
      <div class="foo box">
        <input class="inputText" type="password" name="pwd" placeholder="Your Password">
      </div>
      <div class="foo box">
        <input class="inputText" type="password" name="pwd" placeholder="Confirm your password">
      </div>
      <div class="pwd"><input type="checkbox" name="showPwd" value="1">Show password</div>
      <button @click='increment'>Sign up</button>
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
