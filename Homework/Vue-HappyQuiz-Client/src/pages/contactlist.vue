<template>
  <div>
    <div v-if="showContent">
      <div class="searchBar">
        <search placeholder="请输入要查找的用户名" v-model="searchValue" :autoFixed="false">
          <x-button style="margin-left:10px;" slot="right" mini @click.native="submitSearch">确定</x-button>
        </search>
      </div>
      <div style="position:relative;top:-10px;">
        <group v-if="showQuery">
          <cell :title="'查询结果'">
            <x-icon type="android-search" size="15" slot="icon" fill="gray" style="padding-right:10px"></x-icon>
          </cell>

          <cell class="childCell" :title="result.username" @click.native="addContact">
            <x-icon v-if="this.result.username !== this.notFoundText" slot="icon" style="padding-right:10px" type="android-person" size="15" fill="gray"></x-icon>
            <div style="margin-right:25px;">{{ this.result.msg }}</div>
          </cell>
        </group>

      <group class="cell">
        <cell :title="'公众号'" @click.native="showOfficialAccount = !showOfficialAccount" is-link :arrow-direction="showOfficialAccount ? 'up' : 'down'">
          <x-icon type="person-stalker" size="15" slot="icon" fill="gray" style="padding-right:10px"></x-icon>
        </cell>
        <cell v-if="showOfficialAccount" class="childCell">
          <x-icon type="information-circled" size="15" slot="icon" fill="gray" style="padding-right:10px"></x-icon>
          <div slot="title">没有公众号</div>
        </cell>
        <cell :title="'好友列表'" :border-intent="false" is-link :arrow-direction="showContactList ? 'up' : 'down'" @click.native="showContactList = !showContactList">
          <x-icon type="chatbubbles" size="15" slot="icon" fill="gray" style="padding-right:10px"></x-icon>
        </cell>
        <swipeout v-show="showContactList" class="childCell">
          <swipeout-item v-for="(item,i) in this.$store.getters.onlineContacts" :key="i" @click.native="nav('/chatroom/' + item)">
            <div slot="right-menu">
              <swipeout-button type="warn" :width="120" @click.native="rmContact(item)">
                <span style="padding-right:20px;">删除好友</span>
              </swipeout-button>
            </div>
            <div slot="content" class="contactCell" style="padding:11px">
              <x-icon style="padding:0 5px" type="android-person" size="15" fill="green"></x-icon>
              {{ item }}
            </div>
          </swipeout-item>
        </swipeout>
        <swipeout v-show="showContactList" class="childCell">
          <swipeout-item v-for="(item,i) in this.$store.getters.offlineContacts" :key="i" @click.native="showOfflineAlert">
            <div slot="right-menu">
              <swipeout-button type="warn" :width="120" @click.native="rmContact(item)">
                <span style="padding-right:20px;">删除好友</span>
              </swipeout-button>
            </div>
            <div slot="content" class="contactCell" style="padding:11px">
              <x-icon style="padding:0 5px" type="android-person" size="15" fill="gray"></x-icon>
              {{ item }}
            </div>
          </swipeout-item>
        </swipeout>
      </group>
      </div>
    </div>
    <alert style="position:fixed;z-index:1200" v-model="loginAlert" :title="'该页面请登录后查看 :)'" :content="'点击跳转至登录页面'" hide-on-blur @on-hide="nav('/login')"></alert>
    <toast v-model="addComplete" type="success" :time="1500" :position="'middle'">添加成功</toast>
    <toast v-model="contactOffline" type="text" :time="1500" :position="'middle'">好友不在线</toast>
  </div>
</template>

<script>
  import { Alert, Cell, Panel, Group, Swipeout, SwipeoutItem, SwipeoutButton, Search, XButton, Toast } from 'vux'
  import { mapState } from 'vuex'
  import axios from 'axios'
  export default {
    computed: {
      ...mapState([
        'contactList',
        'username'
      ])
    },
    methods: {
      nav (i) {
        this.$router.push(i)
      },
      submitSearch () {
        axios.get(process.env.apiserver + 'users?username=' + this.searchValue).then((response) => {
          if (response.data.username === this.username) {
            this.result.username = this.notFoundText
            this.result.msg = ''
            this.showQuery = true
          } else if (response.data.message === 'Found') {
            this.result.username = response.data.username
            this.result.uid = response.data.uid
            this.result.msg = '点击添加'
            this.showQuery = true
          }
        }, (err) => {
          if (err.response.data.message === 'Not found') {
            this.result.username = this.notFoundText
            this.result.msg = ''
            this.showQuery = true
          }
        })
      },
      rmContact (usrName) {
        axios.put(process.env.apiserver + 'users/' + this.$store.state.vid + '/contactlist/', {rm: usrName}).then(() => {
          this.$store.commit('updateContactlist')
        })
      },
      addContact () {
        if (this.result.username !== this.notFoundText) {
          axios.put(process.env.apiserver + 'users/' + this.$store.state.vid + '/contactlist', {add: this.result.username}).then((response) => {
            if (response.data.message === 'Complete') {
              this.addComplete = true
              this.$store.commit('updateContactlist')
            }
          })
        }
      },
      showOfflineAlert () {
        this.contactOffline = true
      }
    },
    created () {
      if (this.$store.state.username !== '' && this.$store.state.username !== 'anonymous') {
        this.$store.dispatch('updateContactlist')
        this.loginAlert = false
        this.showContent = true
      }
    },
    data () {
      return {
        contactOffline: false,
        addComplete: false,
        loginAlert: true,
        showContent: false,
        showQuery: false,
        searchValue: '',
        showOfficialAccount: false,
        showContactList: true,
        notFoundText: '无此用户',
        result: {
          username: '',
          uid: '',
          msg: ''
        }
      }
    },
    components: {
      Toast,
      Alert,
      Search,
      XButton,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Cell,
      Panel,
      Group
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  .contactCell {
    .vux-1px-t
  }
  .childCell {
    position:relative;
    left:25px
  }
  .cell {
    position: relative;
    top: 0
  }
  .searchBar {
    position: relative;
    top:-14px
  }
</style>

