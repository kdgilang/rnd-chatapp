import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeRouter from './home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: HomeRouter,
      meta: {
        // requiresAuth: true
      },
      // beforeEnter: function (to, from, next) {
      //   next({path:'signin'})
      // }
    }
  ]
})
