<template>
  <div>
    <panel type="2" style="height:100%;width:100%" :list="quiz"></panel>
    <div style="padding-top:15px;">
    <checklist :options="options" v-model="selected" :max="1"></checklist>
    </div>
    <div style="border-radius: 5px;padding:15px 10px;"><x-button @click.native="submitAnwser">提交</x-button></div>
    <toast width="15em" v-model="toast.show" :type="toast.type" :time="2000" is-show-mask :position="'middle'">{{ toast.text }}</toast>
    <div v-if="showAnwser" style="padding:10px;color:red">正确答案: {{ this.anwser }}</div>
    <div v-if="alreadyAnwsered" style="padding:10px;color:red">您已回答过此题，用时: {{ this.lastime }} 秒</div>
  </div>
</template>
<script>
  import { XButton, Checklist, Panel, Toast } from 'vux'
  import axios from 'axios'
  import { CheckObjectInArray } from '../utils/index'
  export default {
    components: {
      Panel,
      Toast,
      Checklist,
      XButton
    },
    methods: {
      submitRank (id, time) {
        axios.post(process.env.apiserver + 'rank', {
          quiz_id: id,
          time: time
        }).then((result) => {
          console.log(result.data)
        })
      },
      submitAnwser () {
        let time = Date.now() - this.startTime
        if (this.selected[0] === this.anwser) {
          this.toast.text = '回答正确!  用时' + (time / 1000) + '秒'
          this.toast.type = 'success'
          this.toast.show = true
          this.submitRank(this.$route.params.id, time)
        } else {
          this.toast.text = '很遗憾，回答错误  用时' + (time / 1000) + '秒'
          this.toast.type = 'cancel'
          this.toast.show = true
          setTimeout(() => {
            this.showAnwser = true
          }, 1000)
        }
      }
    },
    created () {
      axios.get(process.env.apiserver + 'quiz/' + this.$route.params.id).then((result) => {
        this.startTime = Date.now()
        this.anwser = result.data.anwsers[4]
        let tmp = {}
        tmp.title = '问题: ' + result.data.question
        tmp.desc = '出题人: ' + result.data.author
        this.quiz.push(tmp)
        this.options = result.data.anwsers
        this.options.splice(this.options.length - 1, 1)
      })
      axios.get(process.env.apiserver + 'rank').then((result) => {
        let tmp = result.data
        let statics = tmp.find(x => x.username === this.$store.state.username)
        if (statics && CheckObjectInArray(statics.anwsered, 'quiz_id', this.$route.params.id)) {
          this.lastime = statics.anwsered.find(x => x.quiz_id === this.$route.params.id).time / 1000
          this.alreadyAnwsered = true
        }
      })
    },
    data () {
      return {
        showAnwser: false,
        toast: {
          show: false,
          text: '',
          type: 'success'
        },
        anwser: '',
        startTime: '',
        quiz: [],
        options: [],
        selected: [],
        alreadyAnwsered: false,
        lastime: ''
      }
    }
  }
</script>
<style>

</style>
