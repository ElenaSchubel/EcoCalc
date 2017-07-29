<template>
<div id="app">
  <group-view/>

</div>
</template>

<script>
import GroupView from './components/group-view'
export default {
  name: 'app',

  components: {
    GroupView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
