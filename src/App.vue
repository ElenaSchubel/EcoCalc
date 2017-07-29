<template>
<div class="app fill">
  <group-view/>
    <map-view/>
</div>

</template>

<script>
import GroupView from './components/group-view'
import MapView from './components/map'
export default {
  name: 'app',

  computed: {
    currentPopup() {
      return this.$store.state.currentPopup
    }
  },
  components: {
    GroupView,
    MapView
  }
}
</script>

<style>
.app {
  display: flex;
  height: 100%;
  z-index: 10000;
}
</style>
