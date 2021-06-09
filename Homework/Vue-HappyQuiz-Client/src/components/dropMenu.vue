<template>
  <transition mode="out-in" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
    <div :class="menuLoc">
      <ul class="menu">
        <router-link to="/contactlist" >
          <li>
            <span>
              <x-icon class="menuIcon" slot="icon" type="android-person-add" size="20"></x-icon>
              添加好友
            </span>
          </li>
        </router-link>
        <router-link to="/contactlist">
          <li>
            <span>
              <x-icon class="menuIcon" slot="icon" type="android-people" size="20"></x-icon>
              好友列表
            </span>
          </li>
        </router-link>
        <router-link to="/about" >
          <li>
            <span>
              <x-icon class="menuIcon" slot="icon" type="qr-scanner" size="20"></x-icon>
              二维码
            </span>
          </li>
        </router-link>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'dropmenu',
    computed: {
      menuLoc () {
        if (this.$route.path.match(/home/)) return 'cornerAlt'; else return 'corner'
      }
    }
  }
</script>

<style lang="less">
  .corner {
    line-height: 45px;
    border-radius: 5px;
    background-color: #49484b;
    position: absolute;
    padding: 4px 20px 4px 16px;
    right: 7px;
    top: 53px;
    font-family: Microsoft Yahei;
    text-align: left;
    z-index:900;
    .menu li {
      list-style:none;
      color:#FFF;
    }
  }
  .cornerAlt {
    .corner;
    top:93px;
  }
  .menuIcon{
    fill: #FFF;
    margin-right:10px;
    position:relative;
    top:4px;
  }
</style>
