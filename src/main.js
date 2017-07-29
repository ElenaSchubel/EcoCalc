// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import GROUPS from './groupsConfig'
import find from 'lodash/find'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    groups: GROUPS,
    currentPopup: null,
    statsMinimised: false
  },
  mutations: {
    setCurrentOption(state, { option, group, item }) {
      if (item.baseline === null) {
        item.baseline = option.value
      }
      item.current = option.value
    },
    setCurrentPopUp(state,  popupName ) {
      state.currentPopup = popupName
    },
    toggleGroup(state, groupTitle) {
      const group = find(state.groups, group => group.title === groupTitle)
      group.expanded = !group.expanded
    },
    resetGroup(state, groupTitle) {
      const group = find(state.groups, group => group.title === groupTitle)
      group.items.forEach(item => {
        item.current = null
        item.baseline = null
      })
    },
    toggleStatsMinimised(state) {
      state.statsMinimised = !state.statsMinimised
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {
    App
  }
})
