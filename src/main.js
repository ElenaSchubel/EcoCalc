// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    groups: [{
      title: 'waste',
      items: [{
        title: 'rubbish bags',
        options: [{
            title: '0',
            value: 0
          },
          {
            title: '1',
            value: 1
          },
          {
            title: '2',
            value: 2
          },
          {
            title: '3',
            value: 3
          },
          {
            title: '4',
            value: 4
          },
          {
            title: '5',
            value: 5
          },
        ],
        current: 0
      }]
    }]
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
