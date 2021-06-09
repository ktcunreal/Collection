<template>
  <div style="padding-bottom:60px;">
    <panel class="userLayout" :list="user" :type="'1'" @click.native="customFunction"></panel>
    <group class="userLayout">
      <cell title="答题记录" link="/home/ranking"><x-icon class="userIcon" slot="icon" type="document-text" size="20"></x-icon></cell>
      <cell title="好友列表" link="/contactlist"><x-icon class="userIcon" slot="icon" type="android-people" size="20"></x-icon></cell>
      <cell title="收藏夹" @click.native="nav('/tips')"><x-icon class="userIcon" slot="icon" type="ios-bookmarks" size="20"></x-icon></cell>
      <cell title="分享" @click.native="nav('/about')"><x-icon class="userIcon" slot="icon" type="android-share-alt" size="20"></x-icon></cell>
    </group>
    <group class="userLayout">
      <cell title="设置" link="/settings"><x-icon class="userIcon" slot="icon" type="android-settings" size="20"></x-icon></cell>
      <cell title="帮助与支持" @click.native="nav('/tips')"><x-icon class="userIcon" slot="icon" type="help-circled" size="20"></x-icon></cell>
      <cell title="关于" @click.native="nav('/contract')"><x-icon class="userIcon" slot="icon" type="information" size="20"></x-icon></cell>
    </group>
    <actionsheet v-model="actionSheet" :menus="menu" :show-cancel="true" @on-click-menu-logout="logout" @on-click-menu-updateAvatar="nav('/settings')"></actionsheet>
  </div>
</template>

<script>
  import { Group, Cell, Panel, Actionsheet } from 'vux'
  import axios from 'axios'
  const avatar = require('../assets/logo.png')
  const avatar2 = require('../assets/logo.jpg')
  export default {
    components: {
      Group,
      Cell,
      Panel,
      Actionsheet
    },
    computed: {
      user () {
        if (this.$store.state.username && this.$store.state.username !== 'anonymous') {
          return [{
            title: this.$store.state.username,
            src: this.list[0].src,
            desc: '已登录'
          }]
        } else {
          return this.list
        }
      }
    },
    created () {
      if (this.$store.state.username !== 'anonymous') {
        axios.get(process.env.apiserver + 'users/' + this.$store.state.vid).then((response) => {
          if (response.data.customsetting === true) {
            this.list[0].src = avatar
          } else {
            this.list[0].src = avatar2
          }
        })
      }
    },
    methods: {
      nav (i) {
        this.$router.push(i)
      },
      customFunction () {
        if (this.$store.state.username && this.$store.state.username !== 'anonymous') {
          this.actionSheet = true
        } else {
          this.$router.push('/login')
        }
      },
      logout () {
        sessionStorage.removeItem('jwt')
        this.$store.dispatch('updateUsername')
        window.location.reload()
      }
    },
    data () {
      return {
        actionSheet: false,
        menu: {
          updateAvatar: '更改头像',
          logout: '退出登录'
        },
        list: [{
          src: avatar,
          fallbackSrc: avatar,
          title: '游客',
          desc: '登录/注册',
          url: '/login'
        }]
      }
    }
  }
</script>
<style scoped>
  .userIcon {
    padding-right:18px;
    fill:gray;
    position: relative;
    top: 2px;
  }
  .userLayout {
    position:relative;
    font-family: Microsoft Yahei,
    'Avenir',
    Helvetica,
    Arial,
    sans-serif;
  }
</style>
