import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import FormSignin from '@/components/FormSignin'
import FormSignup from '@/components/FormSignup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: FormSignin
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,

    },
    {
      path: '/signin',
      name: 'signin',
      component: FormSignin
    },
    {
      path: '/signup',
      name: 'signup',
      component: FormSignup
    }
  ]
})
