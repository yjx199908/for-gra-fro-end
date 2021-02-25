<template>
  <div id="pat-man">
      <top-selection></top-selection>
      <router-view></router-view>
  </div>
</template>

<script>
import TopSelection from 'components/top-selection.vue'
export default {
    components:{
        TopSelection
    }
}
</script>

<style>

</style>