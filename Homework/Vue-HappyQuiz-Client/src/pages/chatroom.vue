<template>
  <div>
    <div class="message">
      <ul>
        <li v-for="item in msglist">
          <!--<p class="time">-->
            <!--<span>{{ item.time }}</span>-->
          <!--</p>-->
          <div :class="{ self: item.self }">
            <img class="avatar" width="30" height="30" src="../assets/logo.png"/>
            <div class="text">{{ item.text }}</div>
          </div>
        </li>
      </ul>
    </div>

    <group :class="inputBoxLoc">
      <x-input @on-blur="blur" @on-focus="focus" v-model="sndmsg">
        <x-button slot="right" mini @click.native="socket('snd')">发送</x-button>
      </x-input>
    </group>

  </div>
</template>

<script>
  import { Group, Cell, XInput, XButton } from 'vux'
  export default {
    components: {
      Group,
      XButton,
      Cell,
      XInput
    },
    mounted () {
      this.socket('listen')
    },
    computed: {
      inputBoxLoc () {
        if (this.loc === 'focus') {
          return 'inputBoxFocus'
        } else return 'inputBoxBlur'
      }
    },
    methods: {
      focus () {
        this.loc = 'focus'
      },
      blur () {
        this.loc = 'blur'
      },
      socket (action) {
        const io = require('socket.io-client')
        const socket = io('http://45.76.194.196:4000', {query: {name: this.$store.state.username}})
        if (action === 'snd') {
          let trimmedMsg = `{"to":"${this.$route.params.id}","message":"${this.sndmsg}"}`
          socket.emit('msg', trimmedMsg)
          let tmp = {}
          tmp.self = true
          tmp.text = this.sndmsg
          this.msglist.push(tmp)
          this.sndmsg = ''
        } else if (action === 'listen') {
          socket.on('msg', (msg) => {
            let tmp = {}
            tmp.self = false
            tmp.text = msg
            this.msglist.push(tmp)
          })
        }
      }
    },
    data () {
      return {
        loc: 'blur',
        sndmsg: '',
        rcvmessage: [],
        msglist: []
      }
    }
  }
</script>

<style lang="less" scoped>
  .inputBoxBlur{
    width: 100%;position:fixed;bottom:50px
  }
  .inputBoxFocus{
    width: 100%;position:fixed;top:25px
  }
  .message {
    padding: 10px 15px;
    overflow-y: scroll;
    li {
      margin-bottom: 15px;
      list-style:none;
    }
    .time {
      margin: 7px 0;
      text-align: center;
      span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: ~'calc(100% - 40px)';
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;
      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }
    .self {
      text-align: right;
      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #b2e281;
        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
</style>
