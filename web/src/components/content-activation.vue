<template>
	<div id="Activation" class="c-form">
		<div class="o-form row">
		</div>
		<Loader :class="isSubmit ? 'show' : 'hide'"/>
	</div>
</template>

<script> 
const axios = require('axios');
import Loader from './Loader';
export default {
	name: 'content-activation',
	components: {
		Loader
	},
	data () {
		return {
			title: 'Start Chatting',
			urlaction: 'http://localhost:3000/activation',
			form: {
				data: this.$route.params.data,
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
		submitActivation() {
			var self = this;
			self.isSubmit = true;
			self.loader = true;
			axios.post(this.urlAction, this.form).then(function (res) {
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
						self.elerror =  err.response.data.param;
						self.status = err.response.data.status;
						self.$refs[self.elerror].focus();
					}
				}, 1000);
			});
		}
	},
	created: function() {
		this.isSubmit = true;
		this.submitActivation()
	}
}
</script>

<style scoped lang="sass">

</style>