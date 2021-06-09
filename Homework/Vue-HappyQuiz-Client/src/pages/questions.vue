<template>
  <div style="padding-top:40px;padding-bottom:65px;height:100%">
    <card class="card" v-for="item,i in list" :key="i">
      <div slot="header" class="cardTitle" @click="nav('/quiz/' + item._id)"> {{ item.type }} </div>
      <div slot="content" class="cardContent" @click="nav('/quiz/' + item._id)">  {{ item.question }} </div>
      <div slot="footer" class="cardFooter" @click="nav('/quiz/' + item._id)">  {{ item.timestamp }}
        <x-icon type="android-share" size="20" class="infoBlockIcon"></x-icon>
        <x-icon type="android-share-alt" size="20" class="infoBlockIcon"></x-icon>
      </div>
    </card>
    <!--Scroll to here loadmore/滚动至此时加载更多数据-->
    <infinite-loading :distance="10" @infinite="infiniteHandler">
      <span slot="no-more">已全部加载完毕
        <x-icon style="position: relative; top:6px;" type="ios-checkmark-outline"></x-icon>
      </span>
    </infinite-loading>

  </div>
</template>

<script>
//  import infoBlock from '../components/infoBlock.vue'
  import InfiniteLoading from 'vue-infinite-loading'
  import { Card } from 'vux'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        list: []
      }
    },
    computed: {
      ...mapState([
        'quiz'
      ])
    },

    components: {
      Card,
      InfiniteLoading
    },
    methods: {
      nav (i) {
        this.$router.push(i)
      },
      infiniteHandler ($state) {
        if (this.quiz.length < 1) {
          this.$store.dispatch('updateUsername').then(() => {
            this.$store.dispatch('updateQuiz').then((result) => {
              for (let i = 0; i < result.length; i += 2) {
                ((ind) => {
                  setTimeout(() => {
                    let tmp = result.slice(ind, ind + 2)
                    this.list = this.list.concat(tmp)
                    if (this.list.length >= result.length) {
                      $state.loaded()
                      $state.complete()
                    }
                  }, 500 + (500 * ind))
                })(i)
              }
            })
          })
        } else {
          for (let i = 0; i < this.quiz.length; i += 2) {
            ((ind) => {
              setTimeout(() => {
                let tmp = this.quiz.slice(ind, ind + 2)
                this.list = this.list.concat(tmp)
                if (this.list.length >= this.quiz.length) {
                  $state.loaded()
                  $state.complete()
                }
              }, 500 + (500 * ind))
            })(i)
          }
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  .infoBlockIcon {
    position: relative;
    padding-left: 20px;
    padding-right: 10px;
    bottom: -5px;
  }
  .routerlink {
    color:darkgray;
  }
  .card {
    position: relative;
    border-radius:8px;
    margin:8px;
    box-shadow:1px 1px 1px lightgray;
  }
  .cardTitle {
    color: darkgray;
    font-size: 15px;
    padding-top: 12px;
    padding-left: 18px;
  }
  .cardContent {
    color: black;
    padding-top: 10px;
    padding-left: 18px;
    padding-bottom: 20px;
    font-size: 12px;
  }
  .cardFooter {
    .vux-1px-t;
    text-decoration: none;
    text-align: center;
    color: darkgray;
    padding: 3px 0 10px;
    font-size: 10px;
  }
</style>
