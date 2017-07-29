<template>
<div class="statscource">

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


</style>
