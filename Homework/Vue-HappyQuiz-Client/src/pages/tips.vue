<template>
  <div>
    <confirm v-model="show" :title="'此页用于展示组件的跳转功能正常工作'" @on-confirm="onConfirm">
      您可以随意看看，或者返回上一页
    </confirm>
    <p style="text-align:center">这里可以随时填充新内容。</p>
    <x-icon style="display:block;margin:0 auto;fill:green" type="checkmark-circled" size="150"></x-icon>
  </div>
</template>

<script>
  import { Confirm } from 'vux'
  export default {
    components: {
      Confirm
    },
    methods: {
      onConfirm () {
        this.$router.go(-1)
      }
    },
    data () {
      return {
        show: true
      }
    }
  }
</script>
