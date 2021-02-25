<template>
  <div class="top-selection">
    <div class="icon-con">
        <img src="~assets/icon/main-icon.png"/>
    </div>
    <div class="nav-con">
        <div class="nav-li" @click="goto('/gate')">返回首页</div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goto(path){
      this.$router.push(path)
    }
  }
}
</script>

<style>
    @import url('~css/components/top-selection.css');
</style>