import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  sitename: 'Easy Chat',
  token: localStorage.getItem('token')
}

export const store = new Vuex.Store({
  state
})