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
      var landfillIcon = new H.map.Icon('static/garbage.png');
      var landfillMarker = new H.map.Marker({lng: 174.745253, lat: -41.325648}, { icon: landfillIcon });
      this.map.addObject(landfillMarker);

      var botanicalIcon = new H.map.Icon('static/rainforest.png');
      var botanicalMarker = new H.map.Marker({lng: 174.7674514, lat: -41.2823079}, { icon: botanicalIcon });
      this.map.addObject(botanicalMarker);

      var mtVictoriaIcon = new H.map.Icon('static/trekking3.png');
      var mtVictoriaMarker = new H.map.Marker({lng: 174.7798126, lat: -41.2987507}, { icon: mtVictoriaIcon });
      var golfClubMarker = new H.map.Marker({lng: 174.6724045, lat: -41.2899154}, { icon: mtVictoriaIcon });
      this.map.addObject(mtVictoriaMarker);
      this.map.addObject(golfClubMarker);

      var sanctuaryIcon = new H.map.Icon('static/sanctuary.png');
      var sanctuaryMarker = new H.map.Marker({lng: 174.751167, lat: -41.2907781}, { icon: sanctuaryIcon });
      this.map.addObject(sanctuaryMarker);

      var bikingIcon = new H.map.Icon('static/biking.png');
      var bikingMarker = new H.map.Marker({lng: 174.7200583, lat: -41.2969469}, { icon: bikingIcon });
      this.map.addObject(bikingMarker);

      var windmillIcon = new H.map.Icon('static/windmill.png');
      var windmill1Marker = new H.map.Marker({lng: 174.755253, lat: -41.3144351}, { icon: windmillIcon });
      var windmill2Marker = new H.map.Marker({lng: 174.6473962, lat: -41.2680318}, { icon: windmillIcon });
      this.map.addObject(windmill1Marker);
      this.map.addObject(windmill2Marker);

      var redRocksIcon = new H.map.Icon('static/redRocks.png');
      var redRocksMarker = new H.map.Marker({lng: 174.724319, lat: -41.357485}, { icon: redRocksIcon });
      this.map.addObject(redRocksMarker);

      var kiwiIcon = new H.map.Icon('static/kiwi.png');
      var kiwiMarker = new H.map.Marker({lng: 174.727630, lat: -41.308127}, { icon: kiwiIcon });
      this.map.addObject(kiwiMarker);

      this.markers = {}
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
