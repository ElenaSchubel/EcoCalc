<template>
  <div class="controls">
    <p>Let's check my ...</p>

    <div v-for='group in groups' :key="group.title" class="group" :classes="{ expanded: group.expanded }">
      <h2 class="group-title">
        <button @click="toggleGroup(group.title)">{{group.title}}</button>
      </h2>
      <div class="items" v-show="group.expanded">
        <div class="item" v-for='item in group.items' :key="item.title">
          <h3 class="item-title">{{item.questionPrefix}}<strong>{{item.title}}</strong>{{item.questionSuffix}}</h3>
          <div class="options">
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
    },
    toggleGroup(title) {
      this.$store.commit("toggleGroup", title)
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
  background-color: #ddd;
  margin-bottom: 10px;
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
</style>
