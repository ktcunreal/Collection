import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { decodeJWT, checkToken, UTCparser } from '../utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: '',
    vid: '',
    contactList: [],
    onlineUsers: [],
    news: [],
    quiz: [],
    bannerList: []
  },
  getters: {
    onlineContacts (state) {
      var filter = state.contactList.filter(x => x.flag === 'online')
      var tmp = []
      for (let i = 0; i < filter.length; i++) {
        tmp.push(filter[i].username)
      }
      return tmp
    },
    offlineContacts (state) {
      var filter = state.contactList.filter(x => x.flag === 'offline')
      var tmp = []
      for (let i = 0; i < filter.length; i++) {
        tmp.push(filter[i].username)
      }
      return tmp
    }
  },
  mutations: {
    updateNews (state) {
      axios.get(process.env.apiserver + 'news').then((response) => {
        state.news = response.data
      })
    },
    updateBanner (state) {
      axios.get(process.env.apiserver + 'banner').then((response) => {
        state.bannerList = response.data
      })
    },
    updateContactlist (state) {
      axios.get(process.env.apiserver + 'users/' + state.vid + '/contactlist').then((response) => {
        let arr = []
        for (let i = 0; i < response.data.contactlist.length; i++) {
          let tmp = {}
          tmp.username = response.data.contactlist[i]
          let index = store.state.onlineUsers.indexOf(tmp.username)
          index < 0 ? tmp.flag = 'offline' : tmp.flag = 'online'
          arr.push(tmp)
        }
        state.contactList = arr
      })
    },
    updateQuiz (state, payload) {
      // axios.get(process.env.apiserver + 'quiz').then((response) => {
      //   let tmp = response.data
      //   for (let i = 0; i < response.data.length; i++) {
      //     tmp[i].timestamp = UTCparser(tmp[i].timestamp)
      //   }
      //   state.quiz = tmp
      // })
      state.quiz = payload
    },
    updateUsername (state, decoded) {
      state.username = decoded.id
      state.vid = decoded.vid
    },
    updateOnlineUsers (state, payload) {
      state.onlineUsers = payload.arr
      if (state.username !== 'anonymous') {
        store.dispatch('updateContactlist')
      }
    }
  },
  actions: {
    updateQuiz ({ commit }) {
      return new Promise((resolve) => {
        axios.get(process.env.apiserver + 'quiz').then((response) => {
          let tmp = response.data
          for (let i = 0; i < response.data.length; i++) {
            tmp[i].timestamp = UTCparser(tmp[i].timestamp)
          }
          commit('updateQuiz', tmp)
          resolve(tmp)
        })
      })
    },
    updateNews ({ commit }) {
      commit('updateNews')
    },
    updateBanner ({ commit }) {
      commit('updateBanner')
    },
    updateContactlist ({ commit }) {
      commit('updateContactlist')
    },
    updateUsername ({ commit }) {
      return new Promise((resolve) => {
        checkToken().then((result) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + result
          decodeJWT(result).then((decoded) => {
            commit('updateUsername', decoded)
            resolve(decoded)
          })
        })
      })
    }
  }
})

export default store
