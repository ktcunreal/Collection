<template>
  <div class="exploreView">
    <!--Banner//轮播-->
      <swiper loop auto :aspect-ratio="9/16" :show-dots="false" :list="this.bannerList"
              :show-desc-mask="false" class="exploreBanner"></swiper>
    <!--News//新闻-->
    <p>
      <group-title>News</group-title>
      <panel type="1" :list="this.news"></panel>
    </p>
  </div>
</template>

<script>
  import { Panel, Swiper, SwiperItem, GroupTitle } from 'vux'
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState([
        'news',
        'bannerList'
      ])
    },
    created () {
      // 首次加载时触发action，从apiserver获取展示项目列表
      if (this.news.length < 1) {
        this.$store.dispatch('updateNews')
      }
      if (this.bannerList.length < 1) {
        this.$store.dispatch('updateBanner')
      }
    },
    components: {
      GroupTitle,
      Swiper,
      SwiperItem,
      Panel
    }
  }
</script>

<style lang="less" scoped>
  .exploreView{
    padding-bottom: 50px;
  }
  .exploreBanner {
    position: relative;
    height:100%;
    width:100%;
    top:-14px;
  }
</style>
