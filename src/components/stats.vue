<template>
<div class="stats-wrapper">
  <div class="stats">
    <div class="stat">
      <img src="../assets/coins.png" />
      <span :class="money > 0 ? 'positive' : 'negative'">{{ money }}</span>
    </div>
    <div class="stat">
      <img src="../assets/timer.png" />
      <span :class="time > 0 ? 'positive' : 'negative'">{{ time }}</span>
    </div>
    <div class="stat">
      <img src="../assets/grass.png" />
      <span :class="enviroImpact > 0 ? 'positive' : 'negative'">{{ enviroImpact }}</span>
    </div>
  </div>

  <div class="actions">
    <button class="action">What does this mean?</button>
    <button class="action">Where are the stats from?</button>
  </div>
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
.stats-wrapper {
  align-self: center;
  margin: 0 auto;
  background-color: #444;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.stats {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  background-color: #333;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ddd;
}

.stat.positive {
  color: #8BC34A;
}

.stat.negative {
  color: #DD2C00;
}

.stat > img {
  width: 72px;
  height: 72px;
}

.stat > span {
  font-size: 3rem;
}

.actions {
  display: flex;
}

.action {
  margin: 10px;
  padding: 5px 15px;
  background: transparent;
  border: none;
  border-radius: 5px;
  color: #B3E5FC;
  transition: all 0.2s;
}

.action:not(:last-child) {
  margin-right: 0;
}

.action:hover {
  background-color: rgba(179, 229, 252, 0.2);
}

.action:active {
  background-color: rgba(179, 229, 252, 0.4);
}
</style>
