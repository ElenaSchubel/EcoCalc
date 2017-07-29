<template>
<div class="stats-wrapper">
  <div class="stats">
    <div class="stat">
      <img src="../assets/coins.png" />
      <span :class="statClass(money)">{{ formatCurrency(money) }}</span>
    </div>
    <div class="stat">
      <img src="../assets/timer.png" />
      <span :class="statClass(time)">{{ formatTime(time) }}</span>
    </div>
    <div class="stat">
      <img src="../assets/grass.png" />
      <span :class="statClass(enviroImpact)">{{ formatPoints(enviroImpact) }}</span>
    </div>
  </div>

  <div class="actions">
    <button class="action" @click='showPopup("meaning")'>What does this mean?</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'stats',
  methods: {
    showPopup(name){
      this.$store.commit('setCurrentPopUp', name)
    },
    statClass(stat) {
      if (stat > 0) {
        return "positive"
      } else if (stat < 0) {
        return "negative"
      }
      return ""
    },
    formatCurrency(money) {
      if (money >= 0) {
        return "$" + money.toFixed(2)
      } else {
        return "-$" + Math.abs(money).toFixed(2)
      }
    },
    formatTime(time) {
      return "" + time.toFixed(2) + " hr"
    },
    formatPoints(points) {
      if (points > 0) {
        return "+" + points
      } else {
        return points.toString()
      }
    }
  },
  computed: {
    money() {
      const baseline = this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcMoney(item.baseline) : 0)
        }, 0)
      }, 0)

      const current = this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcMoney(item.current) : 0)
        }, 0)
      }, 0)

      return baseline - current
    },
    time() {
      const baseline = this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcTimeSeconds(item.baseline) : 0)
        }, 0)
      }, 0)

      const current = this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcTimeSeconds(item.current) : 0)
        }, 0)
      }, 0)

      const seconds = baseline - current

      return seconds / 3600
    },

    enviroImpact() {
      const baseline = this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcEnviroImpact(item.baseline) : 0)
        }, 0)
      }, 0)

      const current = this.$store.state.groups.reduce((total, group) => {
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcEnviroImpact(item.current) : 0)
        }, 0)
      }, 0)

      return baseline - current
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats-wrapper {
  position: absolute;
  width: 450px;
  height: 230px;
  left: 50%;
  top: 50%;
  margin-top: -180px;
  margin-left: -225px;
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

.stat:first-child {
  margin-right: 30px;
}

.stat:last-child {
  margin-left: 30px;
}

.stat > img {
  width: 72px;
  height: 72px;
}

.stat > span {
  font-size: 2.5rem;
}

.stat .positive {
  color: #8BC34A;
}

.stat .negative {
  color: #DD2C00;
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
