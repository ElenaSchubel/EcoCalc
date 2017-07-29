// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import GROUPS from './groupsConfig'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    groups: GROUPS 
  },
  mutations: {
  setCurrentOption(state,{option,group, item}) {
      item.current  = option.value
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
