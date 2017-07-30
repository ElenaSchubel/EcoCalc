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
    this.addMarkersToMap()
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
    if (!this.markers) {
      this.markers = {}
      this.markers.mtViictoria = this.addmarker('static/trekking3.png', {lng:174.7442 	, lat:-41.299 })
      this.map.addObject(this.markers.mtViictoria)

      this.markers.golfClubMarker = this.addmarker('static/trekking3.png', {lng:174.7442 	, lat:-41.299 })
      this.map.addObject(this.markers.golfClubMarker)

      this.markers.sanctuary = this.addmarker('static/sanctuary.png', {lng: 174.751167, lat: -41.2907781 })
      this.map.addObject(this.markers.sanctuary)

      this.markers.river = this.addmarker('static/river.png', {lng:174.7442 	, lat:-41.299 })
      this.map.addObject(this.markers.river)

      this.markers.biking = this.addmarker('static/biking.png', {lng: 174.7200583, lat: -41.2969469 })
      this.map.addObject(this.markers.biking)

      this.markers.kiwi = this.addmarker('static/kiwi.png', {lng:174.7674514, lat: -41.2823079})
      this.map.addObject(this.markers.kiwi)

      this.markers.botanical = this.addmarker('static/saving_rainforest.png', {lng:174.7442 	, lat:-41.299 })
      this.map.addObject(this.markers.botanical)

      this.markers.redRocks = this.addmarker('static/redRocks.png', {lng: 174.724319, lat: -41.357485})
      this.map.addObject(this.markers.redRocks)

      this.markers.windMill2 = this.addmarker('static/windmill.png', {lng: 174.6473962, lat: -41.2680318})
      this.map.addObject(this.markers.windMill2)

      this.markers.windmill = this.addmarker('static/windmill.png', {lng: 174.755253, lat: -41.3144351 })
      this.map.addObject(this.markers.windmill)

      this.markers.river = this.addmarker('static/river.png', {lng:174.7442 	, lat:-41.299 })
      this.map.addObject(this.markers.river)

      this.markers.ticket = this.addmarker('static/ticket1.png', {lng:174.775384, lat:-41.293715})
      this.map.addObject(this.markers.ticket)

      this.markers.landfill = this.addmarker('static/landfill.png', {lng: 174.745253, lat: -41.325648})
      this.map.addObject(this.markers.landfill)

      this.markers.marine = this.addmarker('static/dolphin.png', {lng:  174.774226, lat:-41.345420})
      this.map.addObject(this.markers.marine)

      this.markers.boat = this.addmarker('static/boat.png', {lng:174.782003 ,lat:-41.279916})
      this.map.addObject(this.markers.boat)
    }

    console.log(this.waste(), this.money())

    this.markers.river.setVisibility(this.waste() > 5)
    this.markers.ticket.setVisibility(this.money() > 10)
    this.markers.landfill.setVisibility(this.waste() >= 0)
    this.markers.marine.setVisibility(this.waste() > 5)
    this.markers.boat.setVisibility(this.money() > 100)
  }

  addmarker(icon,location,description){
    var node = document.createElement('div')
    node.classList.add('map-marker')
    node.setAttribute("data-tooltip", description)
    node.innerHTML=`<img src='${icon}'/>`
    var icon = new H.map.DomIcon(node)
    return new H.map.DomMarker(location, { icon })
  }

  restrictMap() {
    var bounds = new H.geo.Rect(-41.200035, 174.586065, -41.369314, 174.889477 );

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

  currentMoney() {
    return this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcMoney(item.current) : 0)
      }, 0)
    }, 0) * 52
  }
  money() {
    const baseline = this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcMoney(item.baseline) : 0)
      }, 0)
    }, 0) * 52

    return baseline - this.currentMoney()
  }

  currentTime() {
    return this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcTimeSeconds(item.current) : 0)
      }, 0)
    }, 0) * 52
  }
  time() {
    const baseline = this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcTimeSeconds(item.baseline) : 0)
      }, 0)
    }, 0) * 52

    const seconds = baseline - this.currentTime()

    return seconds / 3600
  }

  currentWaste() {
    return this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcWasteKg(item.current) : 0)
      }, 0)
    }, 0) * 52
  }
  waste() {
    const baseline = this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcWasteKg(item.baseline) : 0)
      }, 0)
    }, 0) * 52

    return baseline - this.currentWaste()
  }

  currentCo2() {
    return this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcCo2(item.current) : 0)
      }, 0)
    }, 0) * 52
  }
  co2() {
    const baseline = this.$store.state.groups.reduce((total, group) => {
      if (!group.expanded) return total;
      return total + group.items.reduce((itemsTotal, item) => {
        return itemsTotal + (item.baseline !== null ? item.calcCo2(item.baseline) : 0)
      }, 0)
    }, 0) * 52

    return (baseline - this.currentCo2()) / 1000
  }
}
