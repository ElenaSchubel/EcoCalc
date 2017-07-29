<template>
<div class="whatdoesitmean">
  <button class='close' @click='closePopup'>&times;</button>
  <h2 class="title">Here's how we worked everything out.</h2>
</div>
</template>

<script>
export default {
  methods:{
    closePopup(){
      this.$store.commit('setCurrentPopUp', null)
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
</style>
