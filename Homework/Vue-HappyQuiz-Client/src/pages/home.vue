<template>
  <div>
    <!--navigation tabbar/导航栏-->
    <navBar></navBar>
    <!--routerview/路由视图-->
    <router-view class="innerPageView"></router-view>

  </div>
</template>

<script>
  import navBar from '../components/navBar.vue'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    components: {
      navBar,
      InfiniteLoading
    }
  }
</script>

<style lang="less" scoped>
  .innerPageView {
    overflow-y:scroll;
  }
</style>
