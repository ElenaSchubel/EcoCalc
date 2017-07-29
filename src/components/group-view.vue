<template>
  <div class="controls">
    <p>Let's check my ...</p>

    <div v-for='group in groups' :key="group.title" class="group" :class="{ active: allBaselines(group) }">
      <h2 class="group-title">
        <button @click="toggleGroup(group.title)">{{group.title}}</button>
      </h2>
      <div class="items" v-show="group.expanded">
        <p class="explanation" v-if="allBaselines(group)">
          The yellow markers show where you're at right now. See what you could get with lower or higher amounts!
          <button class="reset" @click="resetGroup(group)">Start again</button>
        </p>

        <div class="item" v-for='item in group.items' :key="item.title">
          <h3 class="item-title" v-if="!allBaselines(group)">{{item.questionPrefix}}<strong>{{item.title}}</strong>{{item.questionSuffix}}</h3>
          <h3 class="item-title" v-if="allBaselines(group)">{{item.whatIfPrefix}}<strong>{{item.title}}</strong>{{item.whatIfSuffix}}</h3>
          <div class="options">
            <button
                v-for='option in item.options'
                :key="option.title"
                class="option"
                :class="{ active: allBaselines(group) && item.baseline !== null && option.value === item.current, baseline: option.value === item.baseline }"
                @click='setCurrentOption(option, item, group) '>
              {{option.title}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allBaselines } from "../stats-helper"

export default {
  name: 'group-view',
  computed: {
    groups() {
      return this.$store.state.groups
    }
  },
  methods: {
    allBaselines,
    setCurrentOption(option, item, group) {
      this.$store.commit('setCurrentOption', { option, item, group })
    },
    toggleGroup(title) {
      this.$store.commit("toggleGroup", title)
    },
    resetGroup(group) {
      this.$store.commit("resetGroup", group.title)
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
  min-width: 400px;
  overflow-y: auto;
}

.group {
  border-radius: 5px;
  border: 3px solid transparent;
  background-color: #ddd;
  margin-bottom: 10px;
}

.group.active {
  border-color: #ffc107;
}

.group-title {
  font-size: 1rem;
  text-transform: uppercase;
  margin: 0;
}

.group-title > button {
  display: flex;
  border: none;
  background: transparent;
  padding: 10px 15px;
  color: #0277BD;
  width: 100%;
  position: relative;
  text-transform: uppercase;
}

.group-title > button:after {
  content: "+";
  position: absolute;
  right: 15px;
}

.items {
  padding: 15px;
  padding-top: 5px;
}

.explanation {
  color: #777;
  margin: 5px 0 0 0;
}

.reset {
  border: none;
  background: transparent;
  color: #0277BD;
  padding: 0;
  text-decoration: underline;
}

.item-title {
  margin: 15px 0 10px 0;
  font-weight: 300;
}

.item:first-child .item-title {
  margin-top: 0;
}

.options {
  display: flex;
}

.option {
  position: relative;
  flex: 1;
  background: #0277BD;
  border: 1px solid #004967;
  padding: 10px;
  color: #eee;
}

.option:not(:last-child) {
  border-right: none;
}

.option:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.option:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.option.active {
  background-color: #004967;
}

.option.baseline:before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  margin-left: -10px;
  border: 10px solid transparent;
  border-bottom-color: #ff9800;
}
</style>
