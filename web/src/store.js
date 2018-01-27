import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export const state = {
// 	sitename: 'Easy Chat',
// 	token: ""
// }
// export const actions = {
// 	actToken: function({commit}, args) {
// 		commit('setToken', args);
// 	}
// }
// export const mutations = {
// 	setToken: function(state, args) {
// 		if(args.act)  {
// 			if(args.token !== null) {
// 				state.token= args.token;
// 				console.log(state.token)
// 				localStorage.setItem('token', args.token);
// 			}
// 		} else {
// 			localStorage.removeItem('token');
// 		}
// 	}
// }
// export const getters = {
//   isToken: state => {
//   	return (state.token == null) ? false : true
//   },
//   token: state => {
//   	return state.token
//   }
// }
export const store = new Vuex.Store({
	state: {
		sitename: 'Easy Chat',
		apiUri: "http://localhost/",
		token: localStorage.getItem('token')
	},
	actions: {
		actToken: function({commit}, args) {
			commit('setToken', args);
		}
	},
	mutations: {
		setToken: function(state, args) {
			if(args.act)  {
				if(args.token !== null) {
					localStorage.setItem('token', args.token);
				}
			} else {
				state.token = null;
				localStorage.removeItem('token');
			}
		}
	},
	getters: {
	  isToken: state => (state.token === null) ? false : true
	}
})