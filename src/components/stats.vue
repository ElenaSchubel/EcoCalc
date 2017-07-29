<template>
<div class="hello">
  <div v-for='group in groups'><h2>{{group.title}}</h2>
  <div v-for='item in group.items'> {{item.title}}
  <button
    v-for='option in item.options'
    :class="{ active: option.value === item.current }"
    @click='setCurrentOption(option, item, group) '>
  {{option.title}}
  </button>
  </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'hello',
  computed: {
  groups () {
  return this.$store.state.groups
  }
  },
  methods: {
  setCurrentOption(option, item, group) {
  this.$store.commit('setCurrentOption', {option , item, group })
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
