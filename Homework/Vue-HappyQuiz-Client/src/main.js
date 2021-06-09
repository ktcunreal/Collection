import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'
import { rmduplicate } from './utils'

/* eslint-disable */
const io = require('socket.io-client')
const vue = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
})

store.dispatch('updateUsername').then((result) => {
  const socket = io('http://45.76.194.196:4000', {query: {name: result.id}})
  socket.on(result.id, (users) => {
    let tmp = users
    tmp = rmduplicate(tmp)
    store.commit('updateOnlineUsers', {arr: tmp})
  })
  socket.on('updateOnlineUsers', (user) => {
    if (user.flag === 'online') {
      let tmp = store.state.onlineUsers
      tmp.push(user.usr)
      tmp = rmduplicate(tmp)
      store.commit('updateOnlineUsers', {arr: tmp})
    } else if (user.flag === 'offline') {
      let tmp = store.state.onlineUsers
      let index = tmp.indexOf(user.usr)
      if (index > -1) {
        tmp.splice(index,1)
      }
      store.commit('updateOnlineUsers', {arr: tmp})
    }
  })
})

Vue.config.productionTip = false
