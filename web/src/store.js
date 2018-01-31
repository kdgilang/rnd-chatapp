import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

Vue.use(Vuex)

export const state = {
	sitename: 'Easy Chat',
	apiUri: "http://localhost:3000/",
	token: localStorage.getItem('token'),
	user: localStorage.getItem('user')
}
export const actions = {
	actToken: function({commit}, args) {
		commit('setToken', args);
	},
	postApi: function({commit}, args) {
		commit('postApi', args);
	},
	getApi: function({commit}, args) {
		commit('getApi', args);
	}
}
export const mutations = {
	setToken: function(state, args) {
		if(args.act)  {
			if(args.token !== null) {
				localStorage.setItem('token', args.token);
				localStorage.setItem('user', JSON.stringify(args.user));
			}
		} else {
			state.token = null;
			state.user = null;
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		}
	},
	postApi: function (state, args) {
		let headers = {
			Authorization: "Bearer\t" + state.token,
			'Content-Type': args.type
		}
		axios.post(args.url, args.data, {headers})
		.then(function (res) {
			if(typeof args.success === 'function') {
				args.success(res)
			}
		}).catch(function(err) {
			if(typeof args.error === 'function') {
				args.error(err)
			}
		});
	},
	getApi: function (state, args) {
		axios.get(args.url, {headers:{Authorization: "Bearer\t" + state.token}})
		.then(function (res) {
			if(typeof args.success === 'function') {
				args.success(res)
			}
		}).catch(function(err) {
			if(typeof args.error === 'function') {
				args.error(err)
			}
		});
	}
}
export const getters = {
  	isAuthUser: state => (state.token === null) ? false : true,
  	currentUser: state => state.user,
	getApiUri: (state, getters) => (path) => {
		return state.apiUri + path;
	}
}
export const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})