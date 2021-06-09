<template>
  <div class="bottomBar">
    <tabbar class="bottomBarSlot">
      <tabbar-item link="/" :selected="matchHome">
        <x-icon class="inactive" slot="icon" type="ios-home" size="32"></x-icon>
        <x-icon class="active" slot="icon-active" type="ios-home" size="32"></x-icon>
      </tabbar-item>
      <tabbar-item link="/explore" badge="1" :selected="matchExplore">
        <x-icon class="inactive" slot="icon" type="android-compass" size="32"></x-icon>
        <x-icon class="active" slot="icon-active" type="android-compass" size="32"></x-icon>
      </tabbar-item>
      <tabbar-item link="/user" show-dot :selected="matchUser">
        <x-icon class="inactive" slot="icon" type="android-person" size="32"></x-icon>
        <x-icon class="active" slot="icon-active" type="android-person" size="32"></x-icon>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'bottomBar',
    components: {
      Tabbar,
      TabbarItem
    },
    computed: {
      matchExplore () {
        if (this.$route.path === '/explore') {
          return true
        }
      },
      matchHome () {
        if (this.$route.path.match(/home/)) return true
      },
      matchUser () {
        if (this.$route.path === '/user' || this.$route.path === '/login' || this.$route.path === '/settings') {
          return true
        }
      }
    }
  }
</script>

<style scoped>
  .bottomBarSlot {
    background-color: white;
    padding-bottom: 10px;
    padding-top: 5px
  }
  .bottomBarSlot:before {
    /*display: none*/
  }
  .bottomBar {
    position: fixed;
    width: 100%;
    bottom: 0
  }
  .inactive {
    fill: darkgray;
  }
  .active {
    fill: black;
  }
</style>
