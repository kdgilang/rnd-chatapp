<template>
	<div id="searchUser" class="form-group">
		<input @keyup="searchUser" type="text" v-model="userkey" placeholder="Search user" class="form-control">
		<span class="icon-search fa fa-search"></span>
		<user-list v-on:mouseover="userlisthover" @select-user="selectUser" :show="isSubmit" :users="usersres" cs="dropdown"/>
	</div>
</template>

<script>
import userlist from './user-list';
export default {
	components: {
		'user-list': userlist
	},
	data() {
		return {
			userkey: '',
			isSubmit: false,
			notFound: false,
			users: null,
			usersres: []
		}
	},
	methods: {
		searchUser() {
			if(/\S/.test(this.userkey) && this.userkey !== '') {
				let that = this;
				that.usersres = [];
				that.users.find(function(val, key) {
					let userkey = new RegExp(that.userkey, 'i');
					if(userkey.test(val.name)) {
						that.isSubmit = true;
						that.usersres.push(val);
					} else {
						that.notFound = true;
					}
				});
			} else {
				this.isSubmit = false;
				this.notFound = false;
			}
		},
	    selectUser(user) {
	    	let usersHistory = this.$store.state.userHistory;
	    	let status = true;
	    	if(usersHistory.length<=0) {
	    		this.$store.state.userHistory.push(user);
	    	} else {
		    	new Promise(function(resolve, reject){
			    	usersHistory.find(function(val, key) {
			    		if(val.email === user.email) {
			    			status = false
			    		}
			    		resolve(status);
			    	});
			    }).then(function (status) {
		    		if(status) {
		    			this.$store.state.userHistory.push(user);
		    		}
		    	});
	    	}
	    },
	    userlisthover() {
			console.log('d')
		 	that.isSubmit = false;
	    }
	},
	created: function() {
		let that = this;
		this.$store.dispatch('getApi', {
			url: that.$store.getters.getApiUri('user/all/'),
			success: function (res) {
				that.users = res.data;
			},
			error: function (err) {
				that.users = [];
			}
		});
	}
}
</script>

<style lang="sass">
#searchUser
	position: relative
	.icon-search
		position: absolute
		right: 10px
		top: 10px
	input
		padding-right: 32px
	.dropdown
		margin-top: 10px
		background-color: #fff
		box-shadow: 0 0 5px rgba(0,0,0,0.2)
		padding-left: 0
		position: absolute
		left: 0
		width: 100%
		z-index: 10
		li
			display: flex
			cursor: default
			list-style: none
			padding: 8px 15px
			text-align: left
			&:hover
				background-color: #efefef
			.img
				border-radius: 10px
				display: block
				height: 20px
				margin-top: 6px
				overflow: hidden
				width: 20px
				img
					display: block
			.name
				color: #333
				display: block
				font-size: 14px
				margin-left: 10px
				overflow: hidden
				text-transform: capitalize
				text-overflow: ellipsis
				white-space: nowrap
				width: 100px
			.email
				color: #aca
				display: block
				font-size: 8px
				overflow: hidden
				text-overflow: ellipsis
				white-space: nowrap
				width: 100%
			.delete
				display: none
</style>