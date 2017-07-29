<template>
<div id="app">
  <img src="./assets/logo.png">
  <router-view></router-view>
  <button v-on:click="increment">I am the All Mighty Button</button>
  <span> {{count}}</span>
</div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    increment() {
      this.$store.commit('increment')
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
