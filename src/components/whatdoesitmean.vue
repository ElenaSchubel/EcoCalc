<template>
<div class="whatdoesitmean">
  <button class='close' @click='closePopup'>&times;</button>
  <h2 class="title">Here's how we worked everything out.</h2>

  <h3>Money</h3>
  <table class="table">
    <tr v-for="calc in moneyCalculations" :key="calc[0]">
      <th>{{ calc[0] }}</th>
      <th>&mdash;</th>
      <td>{{ formatCurrency(calc[1]) }} {{ calc[2] }}</td>
      <td>×</td>
      <td>{{ calc[3] }} {{ calc[4] }}</td>
      <td>=</td>
      <td>{{ formatCurrency(calc[1] * calc[3]) }}</td>
      <td v-for="source in calc[5]" :key="source[0]"><a class="source" :href="source[0]">[{{source[1]}}]</a></td>
    </tr>
  </table>

  <p class="average">
    Did you know: The average Wellingtonian spends {{moneyAverages}}.
    <span class="your-average">{{ bestAverage(vsAverage("money", currentMoney)) }}</span>
  </p>
</div>
</template>

<script>
import { formatCurrency, formatTime, formatPoints } from "../format-helper"
import { allBaselines } from "../stats-helper"
import maxBy from "lodash/maxBy"

export default {
  computed: {
    moneyCalculations() {
      let sourceIndex = 1
      return this.$store.state.groups.reduce((calculations, group) => {
        let relevantItems = group.items.filter(item => item.current !== null && item.current !== 0 && item.moneyMultiplier > 0)
        relevantItems.forEach(item => {
          let sources = item.source.map(s => [s, sourceIndex++])
          calculations.push([item.title, item.moneyMultiplier, item.moneyMultiplierDesc, item.current, item.timeMultiplier, sources])
        })
        return calculations
      }, [])
    },
    moneyAverages() {
      let averages = this.$store.state.groups.filter(group => group.expanded && allBaselines(group)).map(group =>
        `${formatCurrency(group.averages.money)} per year on ${group.averages.moneyDesc}`
      )

      if (averages.length > 2) {
        return averages.slice(0, -1).join(", ") + " and " + averages[averages.length - 1]
      } else if (averages.length == 2) {
        return averages[0] + " and " + averages[1]
      } else {
        return averages[0]
      }
    },
    currentMoney() {
      return this.$store.state.groups.reduce((total, group) => {
        if (!group.expanded) return total;
        return total + group.items.reduce((itemsTotal, item) => {
          return itemsTotal + (item.baseline !== null ? item.calcMoney(item.current) : 0)
        }, 0)
      }, 0) * 52
    },
  },
  methods:{
    closePopup(){
      this.$store.commit('setCurrentPopUp', null)
    },
    formatCurrency,
    formatTime,
    formatPoints,
    vsAverage(type, value) {
      let groups = this.$store.state.groups.filter(group => group.expanded && allBaselines(group))
      let average = groups.map(group => group.averages[type]).reduce((x, y) => x + y, 0)

      let proportion = value / average

      return Math.round((1 - proportion) * 100)
    },
    bestAverage(...averages) {
      let avg = maxBy(averages, avg => Math.max(avg))

      if (avg === 0) {
        return "-"
      }
      return `With this setup, you're ${Math.abs(avg)}% ${avg >= 0 ? "below" : "above"} average.`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whatdoesitmean {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  background-color: #333;
  border-radius: 5px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: #ddd;
  text-align: center;
}

.close {
  align-self: flex-end;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  color: #B3E5FC;
}

.title {
  font-size: 1.25rem;
  margin: 0 0 10px 0;
}

.table {
  margin: 0 auto;
}

.table th,
.table td {
  text-align: left;
}

.average {
  text-align: center;
  color: #777;
}

.your-average {
  color: #ddd;
}

.source {
  color: #B3E5FC;
  text-decoration: none;
}
</style>
