<template>
	<div id="FormLSignup" class="container-login">
		<h1 class="text-center title">{{title}}</h1>
		<span id="icon-chat" class="fa fa-comments-o"></span>
		<div class="form-login row">
			<form @submit="submitRegister" :action="urlRegister" class="col-12" method="post">
				<div :class="formGroup('name')">
					<input ref="name" class="form-control" v-model="formRegister.name" type="text" name="name" placeholder="Name ...">
					<span v-html="getIcon('name')" class="has-icon"></span>
				</div>
				<div :class="formGroup('email')">
					<input ref="email" class="form-control" v-model="formRegister.email" type="text" name="email" placeholder="Email ...">
					<span v-html="getIcon('email')" class="has-icon"></span>
				</div>
				<div :class="formGroup('password')">
					<input ref="password" class="form-control" v-model="formRegister.password" type="password" name="password" placeholder="Password">
					<span v-html="getIcon('password')" class="has-icon"></span>
				</div>
				<div :class="formGroup('repassword')">
					<input ref="repassword" class="form-control" v-model="formRegister.repassword" type="password" name="repassword" placeholder="Retype Password">
					<span v-html="getIcon('repassword')" class="has-icon"></span>
				</div>
				<div v-if="isMessage" :class="isMessage ? status ? 'alert alert-success': 'alert alert-danger' : 'alert alert-primary' + '\tcol-xs-12'">
					{{message}}
				</div>
				<button class="btn btn-primary">sign up</button>
				<router-link :to="{name: 'Signin'}" class="btn">Login</router-link>
			</form>
		</div>
		<Loader :class="isSubmit ? 'show' : 'hide'"/>
	</div>
</template>
<script> 
const axios = require('axios');
import Loader from './Loader';
export default {
	name: 'FormLSignup',
	components: {
		Loader
	},
	data () {
		return {
			title: 'Start Chatting',
			urlRegister: 'http://localhost:3000/users/add',
			formRegister: {
				name: null,
				email: null,
				password: null,
				repassword: null
			},
			status: false,
			isSubmit: false,
			isMessage: false,
			message: null,
			elerror: null,
			loader: false
		}
	},
	computed: {
		dataForm() {
			return {...this.formRegister,...this.formLogin}
		}
	},
	methods: {
		submitRegister(e) {
			e.preventDefault();
			var self = this;
			if(!self.isSubmit) {
				self.isSubmit = true;
				self.loader = true;
				axios.post(this.urlRegister, this.formRegister).then(function (res) {
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
			}
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