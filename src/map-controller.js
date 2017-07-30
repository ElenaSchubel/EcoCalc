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
      { zoom: 12, center: { lat: this.location.lat + 0.03, lng: this.location.lng } }
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
      // this.markers.mtViictoria = this.addmarker('static/trekking3.png', {lng:174.7442 	, lat:-41.299 })
      // this.map.addObject(this.markers.mtViictoria)

      // this.markers.golfClubMarker = this.addmarker('static/trekking3.png', {lng:174.7442 	, lat:-41.299 })
      // this.map.addObject(this.markers.golfClubMarker)

      // this.markers.sanctuary = this.addmarker('static/sanctuary.png', {lng: 174.751167, lat: -41.2907781 })
      // this.map.addObject(this.markers.sanctuary)

      this.markers.river = this.addmarker('static/river.png', {lng:174.7442 	, lat:-41.299 }, "Fish die when waste pollutes the river. You'll end up spending more on that essential whitebait ...")
      this.map.addObject(this.markers.river)

      // this.markers.biking = this.addmarker('static/biking.png', {lng: 174.7200583, lat: -41.2969469 })
      // this.map.addObject(this.markers.biking)

      this.markers.kiwi = this.addmarker('static/kiwi.png', {lng: 174.784440, lat: -41.319527}, "New Zealand's wildlife can choke on plastic if it's left lying around.")
      this.map.addObject(this.markers.kiwi)

      this.markers.botanical = this.addmarker('static/rainforest.png', {lng:174.7412 	, lat:-41.309 }, "Trees soak up carbon dioxide, but not the amount we're currently producing.")
      this.map.addObject(this.markers.botanical)

      // this.markers.redRocks = this.addmarker('static/redRocks.png', {lng: 174.724319, lat: -41.357485})
      // this.map.addObject(this.markers.redRocks)

      this.markers.windmill = this.addmarker('static/windmill.png', {lng: 174.6473962, lat: -41.2785918}, "Renewable energy sources will also help with reducing our emissions. We're already doing pretty well at this!")
      this.map.addObject(this.markers.windmill)

      // this.markers.windmill = this.addmarker('static/windmill.png', {lng: 174.755253, lat: -41.3144351 })
      // this.map.addObject(this.markers.windmill)

      // this.markers.river = this.addmarker('static/river.png', {lng:174.7442 	, lat:-41.299 })
      // this.map.addObject(this.markers.river)

      this.markers.ticket = this.addmarker('static/ticket1.png', {lng:174.775384, lat:-41.293715}, "Why not treat yourself with a few dollars of that money you just saved!")
      this.map.addObject(this.markers.ticket)

      this.markers.landfill = this.addmarker('static/garbage-truck.png', {lng: 174.745253, lat: -41.325648}, "The Happy Valley landfill is filling up fast, and will soon eat into more of our beautiful scenery.")
      this.map.addObject(this.markers.landfill)

      this.markers.marine = this.addmarker('static/dolphin.png', {lng:  174.774226, lat:-41.355420}, "Sea life can also die when it accidentally eats the plastic we throw away.")
      this.map.addObject(this.markers.marine)

      this.markers.boat = this.addmarker('static/boat.png', {lng:174.782003 ,lat:-41.279916}, "You could go on a awesome boat trip with the amount of money you've saved!")
      this.map.addObject(this.markers.boat)
    }

    this.markers.river.setVisibility(this.waste() > 5)
    this.markers.ticket.setVisibility(this.money() > 10)
    this.markers.landfill.setVisibility(this.waste() <= 0)
    this.markers.marine.setVisibility(this.waste() > 5)
    this.markers.boat.setVisibility(this.money() > 100)
    this.markers.kiwi.setVisibility(this.waste() < 0)
    this.markers.botanical.setVisibility(this.co2() > 0)
    this.markers.windmill.setVisibility(this.co2() > 0)
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
    // this.map.addObject(new H.map.Rect(bounds, {
    //   style: {
    //       fillColor: 'rgba(0, 0, 0, 0)',
    //       //strokeColor: 'rgba(55, 85, 170, 0.6)',
    //       lineWidth: 1
    //     }
    //   }
    // ));
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
