<template>
<div class="whatdoesitmean">
  <button class='close' @click='closePopup'><img src='../assets/icons8-Delete-48.png'/></button>
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
.whatdoesitmean{
  flex: auto;
  background-color: rgb(66, 204, 184);
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;

}

.close {
  align-self: flex-end;
}
</style>
