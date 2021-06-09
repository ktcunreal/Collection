<template>
  <div>
    <div v-if="showContent" style="padding-top:25px">
      <group>
        <group-title>请输入问题</group-title>
        <x-textarea v-model="question"></x-textarea>
        <group-title>问题类型</group-title>
        <x-input v-model="type"></x-input>
      </group>
      <group>
        <group-title>答案选项A</group-title>
        <x-input v-model="A"></x-input>
        <group-title>答案选项B</group-title>
        <x-input v-model="B"></x-input>
        <group-title>答案选项C</group-title>
        <x-input v-model="C"></x-input>
        <group-title>答案选项D</group-title>
        <x-input v-model="D"></x-input>
      </group>
      <group title="正确答案为">
        <radio :options="options" v-model="E"></radio>
      </group>
      <div style="padding-top:20px;padding-bottom:80px;">
        <x-button @click.native="submitQuestion" style="background-color: deepskyblue;color: white">提交</x-button>
      </div>

    </div>
    <toast width="12em" v-model="toast.show" :type="toast.type" :time="2000" is-show-mask :position="'middle'">{{ toast.text }}</toast>
    <alert style="position:fixed;z-index:1200" v-model="showAlert"
           :title="'该页面请登录后查看 :)'" :content="'点击跳转至登录页面'" hide-on-blur
           @on-hide="nav('/login')"></alert>
  </div>
</template>

<script>
  import { Alert, XTextarea, Group, XButton, GroupTitle, XInput, Radio, Toast } from 'vux'
  import axios from 'axios'
  export default {
    components: {
      Toast,
      Radio,
      Alert,
      XInput,
      GroupTitle,
      XTextarea,
      XButton,
      Group
    },

    methods: {
      nav (i) {
        this.$router.push(i)
      },
      getValueOfE () {
        switch (this.E) {
          case 'A':
            this.E = this.A
            break
          case 'B':
            this.E = this.B
            break
          case 'C':
            this.E = this.C
            break
          case 'D':
            this.E = this.D
        }
      },
      submitQuestion () {
        if (!!this.A && !!this.B && !!this.C && !!this.D && !!this.E && !!this.type && !!this.question) {
          this.getValueOfE()
          let arr = []
          arr.push(this.A, this.B, this.C, this.D, this.E)
          axios.post(process.env.apiserver + 'quiz', {
            question: this.question,
            type: this.type,
            anwsers: arr
          }).then((result) => {
            if (result.data.message === 'Complete') {
              this.toast.type = 'success'
              this.toast.text = '提交成功'
              this.toast.show = true
              setTimeout(() => {
                this.$router.push('/home')
              }, 2000)
            }
          })
        } else {
          this.toast.type = 'cancel'
          this.toast.text = '请将上方表单填写完整'
          this.toast.show = true
        }
      }
    },
    created () {
      if (this.$store.state.username && this.$store.state.username !== 'anonymous') {
        this.showAlert = false
        this.showContent = true
      }
    },
    data () {
      return {
        toast: {
          show: false,
          type: 'cancel',
          text: ''
        },
        options: ['A', 'B', 'C', 'D'],
        question: '',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        type: '',
        showContent: false,
        showAlert: true
      }
    }
  }
</script>
