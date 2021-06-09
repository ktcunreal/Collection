<template>

  <tab class="homeNavBar" :line-width="3" active-color="red">
    <tab-item class="tabTitle" :selected="!!this.$route.path.match(/questions/)"
              @on-item-click="nav('questions')">开心问答</tab-item>
    <tab-item class="tabTitle" :selected="!!this.$route.path.match(/submitquestion/)"
              @on-item-click="nav('submitquestion')">我来出题</tab-item>
    <tab-item class="tabTitle" :selected="!!this.$route.path.match(/ranking/)"
              @on-item-click="nav('ranking')">排行榜</tab-item>
  </tab>

</template>

<script>
  import { Tab, TabItem } from 'vux'
  export default {
    name: 'navbar',
    components: {
      Tab,
      TabItem
    },
    methods: {
      nav (i) {
        this.$router.push(i)
      }
    }
  }
</script>

<style lang="less" scoped>
  .tabTitle {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Microsoft Yahei,
    'Avenir',
    Helvetica, Arial,
    sans-serif;
  }
  .homeNavBar {
    z-index:1000;
    position:fixed;
    top:46px;
    width:100%;
  }
</style>
