<template>
<div class="stats-wrapper" :class="{ minimised: this.$store.state.statsMinimised }">
  <button class="minimise" @click="toggleMinimised"></button>

  <h1 class="placeholder" v-show="!hasStats(this.$store.state.groups)">
    Start by picking some stats to mess with on the left
  </h1>

  <h1 class="heading" v-show="hasStats(this.$store.state.groups)">In a year's time, you could have ...</h1>

  <div class="stats" v-show="hasStats(this.$store.state.groups)">
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
      <span class="small" :class="statClass(waste)">{{ formatPoints(waste) }}kg waste</span>
      <span class="small" :class="statClass(co2)">{{ formatPoints(co2) }}kg CO<sub>2</sub></span>
    </div>
  </div>

  <div class="actions" v-show="hasStats(this.$store.state.groups)">
    <button class="action" @click='showPopup("meaning")'>What does this mean?</button>
  </div>
</div>
</template>

<script>
import { hasStats, allBaselines } from "../stats-helper"
import { formatCurrency, formatTime, formatPoints } from "../format-helper"

export default {
  name: 'stats',
  methods: {
    hasStats,
    toggleMinimised() {
      this.$store.commit('toggleStatsMinimised')
    },
    showPopup(name) {
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
    formatCurrency,
    formatTime,
    formatPoints
  },
  computed: {
    currentMoney() {
      return this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcMoney(item.current) : 0)
        }, 0)
      }, 0) * 52
    },
    money() {
      const baseline = this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcMoney(item.baseline) : 0)
        }, 0)
      }, 0) * 52

      return baseline - this.currentMoney
    },

    currentTime() {
      return this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcTimeSeconds(item.current) : 0)
        }, 0)
      }, 0) * 52
    },
    time() {
      const baseline = this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcTimeSeconds(item.baseline) : 0)
        }, 0)
      }, 0) * 52

      const seconds = baseline - this.currentTime

      return seconds / 3600
    },

    currentWaste() {
      return this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcWasteKg(item.current) : 0)
        }, 0)
      }, 0) * 52
    },
    waste() {
      const baseline = this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcWasteKg(item.baseline) : 0)
        }, 0)
      }, 0) * 52

      return baseline - this.currentWaste
    },

    currentCo2() {
      return this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcCo2(item.current) : 0)
        }, 0)
      }, 0) * 52
    },
    co2() {
      const baseline = this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcCo2(item.baseline) : 0)
        }, 0)
      }, 0) * 52

      return (baseline - this.currentCo2) / 1000
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats-wrapper {
  width: 650px;
  height: 250px;
  margin-top: -290px;
  margin-left: -325px;
  background-color: #444;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stats-wrapper.minimised {
  width: 40px;
  height: 40px;
  margin-top: -80px;
  margin-left: -38px;
}

.stats-wrapper.minimised .minimise {
  position: static;
  margin: 0;
  height: 40px;
}

.stats-wrapper.minimised .minimise:after {
  content: "•••";
}

.stats-wrapper.minimised .heading,
.stats-wrapper.minimised .stats,
.stats-wrapper.minimised .actions {
  display: none;
}

.stats-wrapper:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: -27px;
  margin-bottom: 26px;
  border-top: 7px solid #444;
  border-bottom: 7px solid transparent;
  border-left: 9px solid transparent;
  border-right: 9px solid #444;
}

.stats-wrapper:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: -12px;
  margin-bottom: 10px;
  height: 25px;
  width: 25px;
  background-image: url(../assets/star.png);
  background-position: center;
  background-size: cover;
}

.minimise {
  position: absolute;
  top: -10px;
  right: 10px;
  margin-top: -270px;
  border: none;
  background: transparent;
  color: #B3E5FC;
}

.minimise:after {
  content: "×";
}

.placeholder {
  font-size: 1rem;
  color: #aaa;
  font-weight: 300;
  text-align: center;
}

.heading {
  font-size: 1rem;
  color: #aaa;
  font-weight: 300;
  margin: 0;
  padding: 10px 0;
  text-align: center;
  background-color: #333;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.stats {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #333;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ddd;
  width: 190px;
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
  font-size: 2.25rem;
}

.stat > span.small {
  font-size: 1.2rem;
}

.stat > span.average {
  font-size: 0.8rem;
}

.stat .positive {
  color: #8BC34A;
}

.stat .negative {
  color: #DD2C00;
}

.actions {
  display: flex;
  justify-content: center;
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
