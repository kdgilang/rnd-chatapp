import FormSignin from '@/components/FormSignin'
import FormSignup from '@/components/FormSignup'
import Chat from '@/components/Chat'
import ContentSendActivation from '@/components/content-sendactivation'
import ContentActivation from '@/components/content-activation'
import {store} from '@/store'
const HomeRouter = [
  {
    path: 'signin',
    name: 'Signin',
    component: FormSignin,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuthUser) {
        if(to.query.signout) {
          let args = {token:null, act: false};
          store.commit('setToken', args);
        } else {
          next({name:'Chat'})
        }
      }
      next()
    }
  },
  {
    path: 'signup',
    name: 'Signup',
    component: FormSignup
  },
  {
    path: 'sendactivation',
    name: 'Sendactivation',
    component: ContentSendActivation
  },
  {
    path: 'activation/:data',
    name: 'activation',
    component: ContentActivation
  },
  {
    path: 'chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuthUser)
        next()
      else 
        next({name:'Signin'})
    }
  }
];
export default HomeRouter;