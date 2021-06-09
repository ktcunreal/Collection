import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import('../pages/home.vue')
const explore = () => import('../pages/explore.vue')
const login = () => import('../pages/login.vue')
const user = () => import('../pages/user.vue')
const settings = () => import('../pages/settings.vue')
const questions = () => import('../pages/questions.vue')
const submitquestion = () => import('../pages/submitquestion.vue')
const ranking = () => import('../pages/ranking.vue')
const reg = () => import('../pages/reg.vue')
const tips = () => import('../pages/tips.vue')
const about = () => import('../pages/about.vue')
const contactlist = () => import('../pages/contactlist.vue')
const chatroom = () => import('../pages/chatroom.vue')
const quiz = () => import('../pages/quiz.vue')
const contract = () => import('../pages/contract.vue')

const route = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'questions',
          component: questions
        },
        {
          path: 'submitquestion',
          component: submitquestion
        },
        {
          path: 'ranking',
          component: ranking
        },
        {
          path: '',
          redirect: 'questions'
        }
      ]
    },
    {
      path: '/contract',
      component: contract
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/explore',
      name: 'explore',
      component: explore
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/reg',
      component: reg
    },
    {
      path: '/settings',
      component: settings
    },
    {
      path: '/tips',
      component: tips
    },
    {
      path: '/about',
      component: about
    },
    {
      path: '/contactlist',
      component: contactlist
    },
    {
      path: '/chatroom/:id',
      component: chatroom
    },
    {
      path: '/quiz/:id',
      component: quiz
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
export default route
