<template>
  <div>
    <div class="ranking">
    <panel :list="list" ></panel>
    </div>
  </div>
</template>

<script>
  import { Panel, Alert } from 'vux'
  import axios from 'axios'
  export default {
    components: {
      Panel,
      Alert
    },

    methods: {
      nav (i) {
        this.$router.push(i)
      },
      comp (prop) {
        return (obj1, obj2) => {
          let val1 = obj1[prop]
          let val2 = obj2[prop]
          return val2 - val1
        }
      }
    },
    created () {
      axios.get(process.env.apiserver + 'rank').then((result) => {
        for (let i = 0, n = result.data.length; i < n; i++) {
          var totalTime = 0
          var count = result.data[i].anwsered.length
          for (let j = 0; j < count; j++) {
            totalTime = totalTime + result.data[i].anwsered[j].time
          }
          let tmp = {}
          tmp.title = result.data[i].username
          tmp.count = count
          tmp.desc = '回答正确: ' + count + '题,总用时:' + totalTime / 1000 + '秒'
          this.list.push(tmp)
          this.list = this.list.sort(this.comp('count'))
        }
      })
    },
    data () {
      return {
        showContent: false,
        showAlert: true,
        list: []
      }
    }
  }
</script>

<style>
  .ranking {
    margin-top: 30px;
  }
</style>
