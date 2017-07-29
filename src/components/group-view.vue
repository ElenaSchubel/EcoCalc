<template>
  <div class="controls">
    <div v-for='group in groups' :key="group.title" class="group">
      <h2 class="group-title">{{group.title}}</h2>
      <div class="item" v-for='item in group.items' :key="item.title">
        <h3 class="item-title">{{item.title}}</h3>
        <button
            v-for='option in item.options'
            :key="option.title"
            class="option"
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
  name: 'group-view',
  computed: {
    groups() {
      return this.$store.state.groups
    }
  },
  methods: {
    setCurrentOption(option, item, group) {
      this.$store.commit('setCurrentOption', { option, item, group })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controls {
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  padding: 10px;
  width: 25%;
  max-width: 400px;
}
</style>
