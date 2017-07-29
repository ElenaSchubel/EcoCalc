<template>
<div class="app">
  <group-view/>
    <stat-source v-show='currentPopup === "source"'/>
    <what-does-it-mean v-show='currentPopup === "meaning"'/>
    <stats v-show='!currentPopup'/>
</div>
</template>

<script>
import GroupView from './components/group-view'
import Stats from './components/stats'
import StatSource from './components/statsource'
import WhatDoesItMean from './components/whatdoesitmean'
export default {
  name: 'app',

  computed: {
    currentPopup() {
      return this.$store.state.currentPopup
    }
  },
  components: {
    GroupView,
    Stats,
    WhatDoesItMean,
    StatSource
  }
}
</script>

<style>
.app {
  display: flex;
  height: 100%;
}
</style>
