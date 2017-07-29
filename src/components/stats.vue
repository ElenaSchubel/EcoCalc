<template>
<div>
  <div>{{ money }}</div>
  <div>{{ time }}</div>
  <div>{{ enviroImpact }}</div>

</div>

</template>

<script>
export default {
  name: 'stats',
  computed: {
    money() {
      return this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + item.calcMoney(item.current)
        }, 0)
      }, 0)
    },
    time() {
      return this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + item.calcTime(item.current)
        }, 0)
      }, 0)
    },

    enviroImpact() {
      return this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + item.calcEnviroImpact(item.current)
        }, 0)
      }, 0)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
