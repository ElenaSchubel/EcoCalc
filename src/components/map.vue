<template>
  <div class="map-wrapper">
    <div class="map" id="mapContainer"></div>
    <what-does-it-mean v-show='currentPopup === "meaning"'/>
    <stats v-show='!currentPopup'/>
  </div>
</template>

<script>

import Stats from './stats'
import WhatDoesItMean from './whatdoesitmean'
export default {
  name: 'app',

  computed: {
    currentPopup() {
      return this.$store.state.currentPopup
    }
  },
  mounted() {

    

    function addMarkersToMap(map, lat, lng) {

      // Create a marker icon from an image URL:
      var youAreHereIcon = new H.map.Icon('static/you_are_here.png');
      var userLocationMarker = new H.map.Marker({lat: lat, lng: lng}, { icon: youAreHereIcon });
      map.addObject(userLocationMarker);

      var landfillIcon = new H.map.Icon('static/landfill.png');
      var landfillMarker = new H.map.Marker({lng: 174.745253, lat: -41.325648}, { icon: landfillIcon });
      map.addObject(landfillMarker);
    }

  function restrictMap(map){ 
  var bounds = new H.geo.Rect(-41.200035, 174.586065, -41.359314, 174.889477 );

  map.getViewModel().addEventListener('sync', function() {
    var center = map.getCenter();

    if (!bounds.containsPoint(center)) {
      if (center.lat > bounds.getTop()) {
        center.lat = bounds.getTop();
      } else if (center.lat < bounds.getBottom()) {
        center.lat = bounds.getBottom();
      }
      if (center.lng < bounds.getLeft()) {
        center.lng = bounds.getLeft();
      } else if (center.lng > bounds.getRight()) {
        center.lng = bounds.getRight();
      }
      map.setCenter(center);
    }
  });

  //Debug code to visualize where your restriction is
  map.addObject(new H.map.Rect(bounds, {
    style: {
        fillColor: 'rgba(0, 0, 0, 0)',
        //strokeColor: 'rgba(55, 85, 170, 0.6)',
        lineWidth: 1
      }
    }
  ));
  }




        // Initialize the platform object:
    var platform = new H.service.Platform({
    'app_id': 'Q5zvRu68GDywWia3ODjt',
    'app_code': '2fPM7v20izgMJt5hVpEmWQ',
     useCIT: true,
      useHTTPS: true
    });

    // Obtain the default map types from the platform object
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.normal.map,
    {
      zoom: 12,
      center: { lng: 174.7642679, lat: -41.2923359}
    });

    // Create the default UI:
  var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

  // MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  restrictMap(map);

  function geoFindMe() {

  if (!navigator.geolocation){
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    // var img = new Image();
    // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    // output.appendChild(img);

    addMarkersToMap(map, latitude, longitude);
  }



  function error() {
    
  }

  

  navigator.geolocation.getCurrentPosition(success, error);
}

  geoFindMe();
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
