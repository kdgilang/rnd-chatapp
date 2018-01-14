<template>
	<div class="container-login">
		<h1 class="text-center title">{{title}}</h1>
		<span id="icon-chat" class="fa fa-comments-o"></span>
		<div class="form-login row">
			<form ref="form" :action="submitLogin" class="form col-12 col-sm-6">
				<div class="form-group">
					<input class="form-control" v-model="formLogin.name" type="text" name="email" placeholder="Email ...">
				</div>
				<div class="form-group">
					<input class="form-control" v-model="formLogin.password" type="password" name="password" placeholder="Password">
				</div>
				<button class="btn btn-primary">Sign in</button>
			</form>
			<form ref="form" @submit="submitRegister" :action="urlRegister" class="col-12 col-sm-6" method="post">
				<div class="form-group">
					<input class="form-control" v-model="formRegister.name" type="text" name="name" placeholder="Name ...">
				</div>
				<div class="form-group">
					<input class="form-control" v-model="formRegister.email" type="text" name="email" placeholder="Email ...">
				</div>
				<div class="form-group">
					<input class="form-control" v-model="formRegister.password" type="password" name="password" placeholder="Password">
				</div>
				<div class="form-group">
					<input class="form-control" v-model="formRegister.repassword" type="password" name="repassword" placeholder="Retype Password">
				</div>
				<button class="btn btn-primary">sign up</button>
			</form>
			<div v-if="isSubmit" :class="status ? 'success': 'error' + '\tcol-xs-12'">
				{{status ? 'error':'success'}}
			</div>
		</div>
	</div>
</template>
<script> 
const axios = require('axios');
export default {
	name: 'FormLoginRegister',
	data () {
		return {
			title: 'Start Chatting',
			urlRegister: 'http://localhost:3000/users/add',
			urlLogin: 'http://localhost:3000/auth',
			formRegister: {
				name: null,
				email: null,
				password: null,
				repassword: null
			},
			formLogin: {
				email: null,
				password: null
			},
			status: false,
			isSubmit: false,
			message: 'Please Wait...'
		}
	},
	computed: {
		dataForm() {
			return {...this.formRegister,...this.formLogin}
		}
	},
	methods: {
		submitLogin(e) {
			e.preventDefault();
			this.isSubmit = true;
			axios.post(this.urlLogin, this.formLogin).then(function (res) {
				console.log(res);
			}).catch(function (err) {
				console.log(err);
			});
		},
		submitRegister(e) {
			e.preventDefault();
			this.isSubmit = true;
			axios.post(this.urlRegister, this.formRegister).then(function (res) {
				message = res.msg;
				console.log(res.msg);
			}).catch(function (err) {
				console.log(err);
			});
		}
	}
}
</script>

<style scoped lang="sass">
	// @import '../assets/scss/bootstrap/bootstrap'
	@import '../assets/scss/variable'
	@import '../assets/scss/helper'

	.container-login
		background: $color4
		bottom: 0
		position: absolute
		left: 0
		right: 0
		top: 0
		z-index: 1000
		.title 
			color: $color1
			margin-top: 30px;
		#icon-chat
			font-size: 50px
			margin-bottom: 30px
	.form-login
		left: 50%
		position: absolute
		top: 50%
		width: 600px
		@include transform(translate(-50%, -50%))
</style>