<template>
  <div class="map-wrapper">
    <div class="map" id="mapContainer"></div>
    <what-does-it-mean v-show='currentPopup === "meaning"'/>
    <!-- <stats v-show='!currentPopup'/> -->
  </div>
</template>

<script>
import Stats from './stats'
import WhatDoesItMean from './whatdoesitmean'
import MapController from '../map-controller'

export default {
  name: 'app',

  computed: {
    currentPopup() {
      return this.$store.state.currentPopup
    }
  },
  mounted() {
    this.map = new MapController(this.$store, document.getElementById('mapContainer'))
  },

  components: {
    Stats,
    WhatDoesItMean
  }
}
</script>

<style>
.map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;  
}

.map-wrapper {
  position: relative;
  flex: 1;
}
</style>
