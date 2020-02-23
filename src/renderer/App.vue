<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'clipboard'
}
</script>

<style>
/* CSS */
body {
  background: rgba(0, 0, 0, 0.3);
}
* {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
