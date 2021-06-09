<template>
  <div>
    <div class="firstView">
      <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <img v-if="this.notVisited" src="./assets/2.png" style="position:fixed;z-index:2000;width:100%;height:100%;">
      </transition>
    </div>
    <x-header class="headerBar" :left-options="leftOptions">
      <span class="main-title">{{ title }}</span>
      <!--slot="overwrite-title"-->
      <x-icon class="headerBarButton" slot="right" type="android-menu" size="25" v-on-clickaway="hide" @click="toggle"></x-icon>
    </x-header>
      <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <router-view class="mainView"></router-view>
      </transition>
    <dropMenu v-if="opened" @click="hide"></dropMenu>
    <bottomBar></bottomBar>
  </div>
</template>

<script>
  import { XHeader, ViewBox } from 'vux'
  import { directive as onClickaway } from 'vue-clickaway'
  import dropMenu from './components/dropMenu.vue'
  import bottomBar from './components/bottomBar.vue'
  export default {
    name: 'app',
    data () {
      return {
        notVisited: true,
        opened: false
      }
    },
    created () {
      if (sessionStorage.getItem('Visited')) {
        this.notVisited = false
      } else {
        sessionStorage.setItem('Visited', true)
        setTimeout(() => {
          this.notVisited = false
        }, 2000)
      }
    },
    components: {
      XHeader,
      ViewBox,
      dropMenu,
      bottomBar,
      onClickaway
    },
    methods: {
      toggle () {
        this.opened = !this.opened
      },
      hide () {
        this.opened = false
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    computed: {
      leftOptions () {
        return {
          showBack: !this.$route.path.match(/home/)
        }
      },
      title () {
        switch (this.$route.path) {
          default:
            return '首页'
          case '/user':
            return '个人中心'
          case '/explore':
            return '发现'
          case '/settings':
            return '设置'
          case '/login':
            return '登录'
          case '/reg':
            return '注册'
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  ::-webkit-scrollbar{
    display:none;
  }
  html,body {
    background-color: whitesmoke;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Avenir',
    Helvetica, Arial,
    sans-serif;
  }
</style>

<style lang="less" scoped>
  .main-title {
    color:black;
    -webkit-font-smoothing: antialiased;
    font-family: Microsoft Yahei,
    'Avenir',
    Helvetica,
    Arial,
    sans-serif;
  }
  .mainView {
    position: relative;
    top:60px
  }
  .headerBar {
    width:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:1100;
    background-color:white;
  }
  .headerBarButton {
    position: relative;
    top: -3px;
    right: -3px;
    fill: black;
  }
  .animated {
    animation-duration: 0.2s;
  }
  .firstView {
    .animated {
      animation-duration: 2s;
    }
  }
</style>
