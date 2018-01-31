<template>
	<div id="FormActivation" class="c-form">
		<div class="o-form row">
			<form @submit="sendActivation" action="" class="form col-12">
				<div class="form-group">
					<input type="email" v-model="form.email" placeholder="email..." name="email" class="form-control">
				</div>
				<div class="form-group">
					<button class="btn btn-primary">Send Activation</button>
					<router-link :to="{name: 'Signin'}" class="btn">signin</router-link>
				</div>
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
	name: 'content-sendactivation',
	components: {
		Loader
	},
	data () {
		return {
			title: 'Start Chatting',
			url: this.$store.getters.getApiUri('send-email-verification'),
			form: {
				email: null,
			},
			status: false,
			isSubmit: false,
			isMessage: false,
			message: null,
			loader: false
		}
	},
	methods: {
		sendActivation(e) {
			e.preventDefault();
			var self = this;
			self.isSubmit = true;
			self.loader = true;
			axios.post(this.url, this.form).then(function (res) {
				setTimeout(function () {
					self.isSubmit = false;
					self.isMessage = true;
					self.loader = false;
					self.message = res.data.msg;
					self.status = res.data.status;
				}, 1000);
			}).catch(function (err) {
				setTimeout(function () {
					self.isSubmit = false;
					self.loader = false;
					if(err.response !== undefined) {
						self.isMessage = true;
						self.message = err.response.data.msg;
						self.status = err.response.data.status;
					}
				}, 1000);
			});
		}
	}
}
</script>

<style scoped lang="sass">

</style>