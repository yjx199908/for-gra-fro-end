<template>
  <div id="gate">
      <div class="top-bar">
        <div class="icon-con">
            <img src="~assets/icon/main-icon.png"/>
        </div>
        <div class="nav-con">
            <div class="nav-li" @click="goto('/che-sta')">检查数据统计</div>
            <div class="nav-li" @click="goto('/lab-sta')">检验数据统计</div>
            <div class="nav-li" @click="goto('/pat-data')">病患数据检索</div>
            <div class="nav-li" @click="goto('/pat-man')">病患数据管理</div>
        </div>
      </div>
      <div class="main">
          
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
    @import url('~css/gate.css');
</style>