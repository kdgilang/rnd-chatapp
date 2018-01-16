<template>
	<div id="FormSignin" class="container-login">
		<h1 class="text-center title">{{title}}</h1>
		<span id="icon-chat" class="fa fa-comments-o"></span>
		<div class="form-login row">
			<form @submit="submitLogin" action="urlLogin" class="form col-12">
				<div :class="formGroup('email')">
					<input ref="email" class="form-control" v-model="formLogin.email" type="text" name="email" placeholder="Email ...">
					<span v-html="getIcon('email')" class="has-icon"></span>
				</div>
				<div :class="formGroup('password')">
					<input ref="password" class="form-control" v-model="formLogin.password" type="password" name="password" placeholder="Password">
					<span v-html="getIcon('password')" class="has-icon"></span>
				</div>
				<button class="btn btn-primary">Sign in</button>
				<router-link :to="{name: 'Signup'}" class="btn">register</router-link>
				<div v-if="isMessage" :class="isMessage ? status ? 'alert alert-success': 'alert alert-danger' : 'alert alert-primary' + '\tcol-xs-12'">
					{{message}}
				</div>
			</form>
		</div>
		<Loader :class="isSubmit ? 'show' : 'hide'"/>
	</div>
</template>

<script> 
const axios = require('axios');
import Loader from './Loader';
export default {
	name: 'FormSignin',
	components: {
		Loader
	},
	data () {
		return {
			title: 'Start Chatting',
			urlLogin: 'http://localhost:3000/auth',
			formLogin: {
				email: null,
				password: null
			},
			status: false,
			isSubmit: false,
			isMessage: false,
			message: null,
			elerror: null,
			loader: false
		}
	},
	methods: {
		submitLogin(e) {
			e.preventDefault();
			var self = this;
			self.isSubmit = true;
			self.loader = true;
			axios.post(this.urlLogin, this.formLogin).then(function (res) {
				setTimeout(function () {
					self.isSubmit = false;
					self.isMessage = true;
					self.loader = false;
					self.message = res.data.msg;
					self.status = res.data.status;
				}, 1000);
			}).catch(function (err) {
				setTimeout(function () {
					self.loader = false;
					if(err.response.data !== undefined) {
						self.isSubmit = false;
						self.isMessage = true;
						self.message = err.response.data.msg;
						self.elerror =  err.response.data.param;
						self.status = err.response.data.status;
						self.$refs[self.elerror].focus();
					}
				}, 1000);
			});
		},
		getIcon(el) {
			return (el === this.elerror) ? '<span class="form-control-feedback fa fa-times"></span>' : '';
		},
		formGroup(el) {
			let cf = 'form-group';
			cf += (this.isMessage) ? (!this.status && this.elerror === el) ? ' has-danger' : ' has-succes' : '';
			return cf;
		}
	}
}
</script>

<style scoped lang="sass">

</style>