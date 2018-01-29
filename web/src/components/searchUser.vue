<template>
	<div id="searchUser" class="form-group">
		<input @keyup="searchUser" type="text" v-model="userkey" placeholder="Search user" class="form-control">
		<span class="icon-search fa fa-search"></span>
		<ul v-show="isSubmit" class="dropdown">
			<li v-for="user in users"> 
				<img src="" alt="">
				<span class="name">{{user.name}}</span>
			</li>
			<li v-show="notFound" class="notFound">User not Found.</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userkey: null,
			isSubmit: false,
			notFound: false,
			users: null
		}
	},
	computed: {
		urlQuery() {
			return this.$store.getters.getApiUri('users/filter/')+this.userkey
		}
	},
	methods: {
		searchUser() {
			let self = this;
			if(this.userkey !== null) {
				this.$store.dispatch('getApi', {
					url: self.urlQuery,
					success: function (res) {
						self.users = res.data;
						self.isSubmit = true;
						if(res.data.length < 1) {
							self.notFound = true;
						}
					}, 
					error: function (res) {
						self.isSubmit = false;
					}
				});
			} else {
				self.isSubmit = false;
				self.notFound = false;
			}
		}
	}
}
</script>

<style scoped lang="sass">
	#searchUser
		position: relative
		.icon-search
			position: absolute
			right: 10px
			top: 10px
		input
			padding-right: 32px
		.dropdown
			padding: 8px 15px
			li
				list-style: none
				text-align: left
</style>