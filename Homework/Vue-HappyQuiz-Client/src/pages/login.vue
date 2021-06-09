<template>
  <div>
    <img src="../assets/1.png" style="position:fixed;top:46px;z-index:0;width:100%;height:100%;">
    <x-icon type="android-contact" size="120" class="avatarImg"></x-icon>
    <div style="position:relative;top:-10px;">
      <div style="padding:20px 30px 30px">
        <x-input class="inputBox" title="用户名" v-model="username"></x-input>
        <x-input class="inputBox" title="密码" v-model="password" type="password" @on-enter="login"></x-input>
      </div>
      <div style="padding:0 50px;">
        <x-button class="loginButton" plain @click.native="login">登录</x-button>
        <x-button class="loginButton" plain @click.native="nav('/reg')">注册</x-button>
      </div>
    </div>
    <toast v-model="loginSuccess" type="success" :time="1000" is-show-mask :position="'middle'">登录成功</toast>
    <toast v-model="loginFailed" type="cancel" width="10em" :time="1000" is-show-mask :position="'middle'">用户名或密码错误</toast>

  </div>
</template>

<script>
  import { XInput, Group, XButton, Toast } from 'vux'
  import axios from 'axios'
  export default {
    components: {
      Group,
      XInput,
      XButton,
      Toast
    },
    created () {
      // Check user session/检查用户是否已登陆
      if (this.$store.state.username && this.$store.state.username !== 'anonymous') {
        this.$router.push('/user')
      }
    },
    methods: {
      nav (i) {
        this.$router.push(i)
      },
      login () {
        axios.post(process.env.apiserver + 'session', {
          username: this.username,
          password: require('crypto').createHash('sha256').update(this.password).digest('hex')
        })
          .then((response) => {
            sessionStorage.setItem('jwt', response.data.token)
            this.loginSuccess = true
            this.$store.dispatch('updateUsername')
            setTimeout(() => {
              // cordova打包后location.herf/replace不可用;router.go(0)不能重新加载入口的main.js
              this.$router.push('/home')
              window.location.reload()
            }, 1000)
          }, (err) => {
            if (err) {
              this.loginFailed = true
            }
          })
      }
    },
    data () {
      return {
        loginSuccess: false,
        loginFailed: false,
        username: '',
        password: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .loginButton {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Microsoft Yahei;
    border-radius:20px!important;
    border-color:white!important;
    /*font-weight:bold!important;*/
    border-width:1px!important;
    color:white!important;
    /*border-style:none!important;*/
    /*background-color:deepskyblue!important;*/
    /*:gradients="['#00acfd','#19D5FD']"*/
  }
  .test {
    margin: 25px 30px 30px;
    .weui-cells {
      border-radius: 10px!important;
    }
  }
  .inputBox {
    font-size: 14px;
    color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Microsoft Yahei,
    'Avenir',
    Helvetica,
    Arial,
    sans-serif;
  }
  .avatarImg {
    position:relative;
    margin:0 auto;
    display: flex;
    fill: white;
  }
</style>
