<template>
	<div id="Activation" class="c-form">
		<div class="o-form row">
			<div v-if="isMessage" :class="isMessage ? status ? 'alert alert-success col-12': 'alert alert-danger col-12' : 'alert alert-primary col-12'">
				{{message}}
				<router-link v-if="status" :to="{name: 'Signin'}" class="btn">sign in</router-link>
			</div>
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
			urlAction: this.$store.getters.getApiUri('activation'),
			key: this.$route.params,
			status: false,
			isSubmit: false,
			isMessage: false,
			message: null
		}
	},
	methods: {
		submitActivation() {
			var self = this;
			self.isSubmit = true;
			axios.post(this.urlAction, this.key).then(function (res) {
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
					if(err.response !== undefined) {
						self.isMessage = true;
						self.message = err.response.data.msg;
						self.status = err.response.data.status;
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