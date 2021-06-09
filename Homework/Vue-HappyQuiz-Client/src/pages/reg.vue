<template>
  <div>
    <group :title="'请填写注册信息'">
      <x-input class="regFont" type="text" v-model="username" :title="'用户名'"></x-input>
      <x-input class="regFont" type="password" v-model="password" :title="'密码'"></x-input>
      <x-input class="regFont" type="number" v-model="phonenumber" is-type="china-mobile" @on-change="verifyPhonenumber" :show-clear="false" :title="'手机号码'">
        <x-button :disabled="disableButton" slot="right" mini @click.native="GenerateVerifyCode">发送验证码</x-button>
      </x-input>
      <x-input class="regFont" title="验证码" v-model="verifyCodeInput"></x-input>
      <toast v-model="showToast" type="success" width="10em" :time="2500" :position="'middle'">验证码为 {{this.code}}</toast>
    </group>

    <div style="padding:10px;">
      <input type="checkbox" id="userTerm" v-model="termAccepted">
      <label for="userTerm">我已阅读并同意<router-link to="/contract">《服务使用协议》</router-link></label>
    </div>

    <div style="padding:0 10px">
      <span style="color:red" v-if="showErrMsg">{{ errMsg }}</span>
      <group>
        <x-button class="regButton" :disabled="!termAccepted" @click.native="submitreg">继续注册</x-button>
      </group>
    </div>
      <toast :position="'middle'" type="success" is-show-mask :time="2000" v-model="regSuccess">注册成功</toast>
  </div>
</template>

<script>
  import { Group, XInput, XButton, Toast } from 'vux'
  import axios from 'axios'

  export default {
    components: {
      Group,
      Toast,
      XInput,
      XButton
    },
    data () {
      return {
        showErrMsg: false,
        termAccepted: false,
        showToast: false,
        disableButton: true,
        regSuccess: false,
        verifyCodeInput: '',
        errMsg: '',
        code: '',
        username: '',
        phonenumber: '',
        password: ''
      }
    },
    methods: {
      submitreg () {
        if (this.verifyCodeInput !== this.code || this.verifyCodeInput === '') {
          this.errMsg = '请重新输入验证码'
          this.showErrMsg = true
        } else if (this.username === '' || this.password === '') {
          this.errMsg = '用户名或密码不能为空'
          this.showErrMsg = true
        } else {
          this.showErrMsg = false
          axios.post(process.env.apiserver + 'users', {
            username: this.username,
            password: require('crypto').createHash('sha256').update(this.password).digest('hex'),
            phonenumber: this.phonenumber
          }).then((response) => {
            if (response.data.message === 'Complete') {
              this.regSuccess = true
              setTimeout(() => {
                this.$router.push('/user')
              }, 2000)
            }
          }, (err) => {
            if (err.response.data.message) {
              this.errMsg = err.response.data.detail
              this.showErrMsg = true
            }
          })
        }
      },
      verifyPhonenumber () {
        var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
        if (reg.test(this.phonenumber)) {
          this.disableButton = false
        }
      },
      GenerateVerifyCode () {
        this.code = ''
        for (let i = 0; i < 6; i++) {
          this.code += Math.floor(Math.random() * 10)
        }
        this.showToast = true
      }
    }
  }
</script>
<style lang="less">
  .regButton {
    font-family: Microsoft Yahei;
    background-color:deepskyblue!important;
    color: white
  }
  .regButton.weui-btn_default {
    color: white!important
  }
  .regButton.weui-btn_disabled.weui-btn_default {
    color: darkgray !important
  }
  .regFont {
    color: dimgrey;
    font-size: 10px
  }
</style>
