<template>
<div class="app">
  <group-view/>
  <stats/>
</div>
</template>

<script>
import GroupView from './components/group-view'
import Stats from './components/stats'
export default {
  name: 'app',

  components: {
    GroupView,
    Stats
  }
}
</script>

<style>
.app {
  display: flex;
  height: 100%;
}
</style>
