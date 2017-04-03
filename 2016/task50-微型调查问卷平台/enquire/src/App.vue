<template>
  <div id="app">
    <hello></hello>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import './style/reset.css'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.main {
  height: 100%;
}
</style>
