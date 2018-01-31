import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import FormSignin from '@/components/FormSignin'
import HomeRouter from './home'
import UserRouter from './user'
import {store} from '@/store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
		path: '/',
		name: 'Home',
		component: Index,
		children: HomeRouter,
		redirect: {name: 'Signin'}
    },
    {
		path: '/user',
		name: 'User',
		component: Index,
		children: UserRouter,
		redirect: {name:'Profile'},
		beforeEnter: (to, from, next) => {
			if(!store.getters.isAuthUser)
				next({name:'Signin'})
			next()
		}
    }
  ]
})
