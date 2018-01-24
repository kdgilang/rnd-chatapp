import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
	sitename: 'Easy Chat',
	token: null
}
export const actions = {
	actToken: function({commit}, args) {
		console.log(args);
		commit('setToken', args);
	}
}
export const mutations = {
	setToken: function(state, args) {
		if(args.act)  {
			if(args.token !== null) {
				Vue.set(state, 'token', args.token);
				localStorage.setItem('token', args.token);
			}
		} else {
			localStorage.removeItem('token');
		}
	}
}
export const getters = {
  isToken: state => {
  	return (state.token == null) ? false : true
  },
  token: state => {
  	return state.token
  }
}
export const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})