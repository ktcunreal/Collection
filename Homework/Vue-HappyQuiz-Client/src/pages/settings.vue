<template>
  <div>
    <group>
      <x-switch :title="'测试选项:'" v-model="value" @on-change="updateSetting"></x-switch>
      <cell disabled>默认使用Vuejs的Logo作为头像</cell>
      <cell disabled>关闭时头像替换为Nodejs的Logo</cell>
    </group>
  </div>
</template>

<script>
  import { Group, XSwitch, Cell } from 'vux'
  import axios from 'axios'
  export default {
    components: {
      Group,
      XSwitch,
      Cell
    },
    created () {
      if (this.$store.state.username !== 'anonymous') {
        axios.get(process.env.apiserver + 'users/' + this.$store.state.vid).then((response) => {
          this.value = response.data.customsetting
        })
      }
    },
    methods: {
      updateSetting () {
        axios.put(process.env.apiserver + 'users/' + this.$store.state.vid, {
          customsetting: this.value
        })
      }
    },
    data () {
      return {
        value: false
      }
    }
  }
</script>
