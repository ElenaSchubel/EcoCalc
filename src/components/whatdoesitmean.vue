<template>
<div class="whatdoesitmean">
  <button class='close' @click='closePopup'>&times;</button>
  <h2 class="title">Here's how we worked everything out.</h2>

  <h3>Money</h3>
  <table>
    <tr v-for="calc in moneyCalculations" :key="calc[0]">
      <th>{{ calc[0] }}</th>
      <td>{{ formatCurrency(calc[1]) }} {{ calc[2] }}</td>
      <td>×</td>
      <td>{{ formatCurrency(calc[3]) }}</td>
      <td>=</td>
      <td>{{ formatCurrency(calc[1] * calc[3]) }} per week</td>
    </tr>
  </table>
</div>
</template>

<script>
import { formatCurrency, formatTime, formatPoints } from "../format-helper"

export default {
  computed: {
    moneyCalculations() {
      return this.$store.state.groups.reduce((calculations, group) => {
        let relevantItems = group.items.filter(item => item.value !== null && item.value !== 0 && item.moneyMultiplier > 0)
        relevantItems.forEach(item => calculations.push([item.title, item.moneyMultiplier, item.moneyMultiplierDesc, item.value]))
        return calculations
      }, [])
    }
  },
  methods:{
    closePopup(){
      this.$store.commit('setCurrentPopUp', null)
    },
    formatCurrency,
    formatTime,
    formatPoints
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
</style>
