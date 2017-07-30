import Vue from "vue"
import Stats from './components/stats'

export default class MapController {
  constructor(store, node) {
    this.location = { lng: 174.7642679, lat: -41.2923359 }
    this.markers = null

    this.$store = store
    this.$store.subscribe(() => this.update())

    this.setup(node)
  }

  setup(node) {
    this.platform = new H.service.Platform({
      'app_id': 'Q5zvRu68GDywWia3ODjt',
      'app_code': '2fPM7v20izgMJt5hVpEmWQ',
      useCIT: true,
      useHTTPS: true
    })

    var defaultLayers = this.platform.createDefaultLayers()

    this.map = new H.Map(
      node,
      defaultLayers.normal.map,
      { zoom: 12, center: this.location }
    )
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers, 'en-US')
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    this.restrictMap()
    this.tryGetLocation()
    this.update()
  }

  update() {
    this.updateStatsMarker()
    if (!this.markers) {
      this.addMarkersToMap();
      this.markers = {}
    }
  }

  updateStatsMarker() {
    if (!this.statsMarker) {
      const baseNode = document.createElement("div")
      baseNode.appendChild(document.createElement("div")) // Will be overwritten by Vue

      const icon = new H.map.DomIcon(baseNode, {
        onAttach: (node) => {
          node._vue = new Vue({
            el: node.childNodes[0],
            store: this.$store,
            template: '<stats/>',
            components: {
              Stats
            }
          })
        },
        onDetach: (node) => {
          node._vue.$destroy()
        }
      })
      this.statsMarker = new H.map.DomMarker(this.location, { icon })

      this.map.addObject(this.statsMarker)
    }

    this.statsMarker.setPosition(this.location)
  }

  addMarkersToMap() {
    var riverIcon = new H.map.Icon('static/river.png')
    var riverMarker = new H.map.Marker({lng:174.7442 	, lat:-41.299 }, {icon: riverIcon})
    var ticketIcon = new H.map.Icon('static/ticket1.png')
    var ticketMarker =  new H.map.Marker({lng:174.775384, lat:-41.293715}, {icon: ticketIcon})
    var landfillIcon = new H.map.Icon('static/landfill.png');
    var landfillMarker = new H.map.Marker({lng: 174.745253, lat: -41.325648}, { icon: landfillIcon });
    var marineIcon = new H.map.Icon('static/dolphin.png');
    var marineMarker = new H.map.Marker({lng:  174.774226, lat:-41.345420}, { icon: marineIcon });
    var boatIcon = new H.map.Icon('static/boat.png');
    var boatMarker = new H.map.Marker({lng:174.782003 ,lat:-41.279916}, { icon: boatIcon });
    this.map.addObject(boatMarker)
    this.map.addObject(marineMarker)
    this.map.addObject(ticketMarker)
    this.map.addObject(riverMarker)
    this.map.addObject(landfillMarker)
  }
  restrictMap() {
    var bounds = new H.geo.Rect(-41.200035, 174.586065, -41.359314, 174.889477 );

    this.map.getViewModel().addEventListener('sync', () => {
      var center = this.map.getCenter();

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
        this.map.setCenter(center);
      }
    });

    //Debug code to visualize where your restriction is
    this.map.addObject(new H.map.Rect(bounds, {
      style: {
          fillColor: 'rgba(0, 0, 0, 0)',
          //strokeColor: 'rgba(55, 85, 170, 0.6)',
          lineWidth: 1
        }
      }
    ));
  }

  tryGetLocation() {
    if (!navigator.geolocation){
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      this.location = { lat: position.coords.latitude, lng: position.coords.longitude }
      this.update()
    });
  }
}
