<template>
	<ul :class="cs" v-show="show">
		<li @click="selectUser(key)" class="item" v-for="user, key in users" v-if="user">
			<span class="img">
				<img :src="user.meta.img_url" :alt="user.name" class="img-fluid">
				<span class="status online" title="online"></span>
			</span>
			<span class="name">
				{{user.name}}
				<span class="email">{{user.email}}</span>
			</span>
			<span @click="deleteUser(key)" class="fa fa-times delete" title="delete"></span>
		</li>
		<li v-if="users.length<1">
			<span>Not Found.</span>
		</li>
	</ul>
</template>

<script>
	export default {
		props:['users', "cs", "show"],
		data() {
			return {
			}
		},
		methods: {
			selectUser(key) {
				this.$emit('select-user', this.users[key]);
			},
			deleteUser(key) {
				this.$emit('delete-user', key);
			}
		}
	}
</script>
<style lang="sass">
@import '../assets/scss/variable'
.contact-list
	margin-top: 10px
	height: 636px
	overflow-y: auto
	padding-left: 0
	width: 100%
	.item
		&:hover
			background-color: #efefef
	li
		display: flex
		cursor: default
		list-style: none
		padding: 8px 15px
		position: relative
		text-align: left
		.img
			border-radius: 35px
			display: block
			height: 35px
			margin-top: 6px
			overflow: hidden
			width: 35px
			img
				display: block
		.name
			color: #333
			display: block
			font-size: 14px
			margin-left: 10px
			margin-top: 4px
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
		.status
			display: block
			height: 5px
			left: 20px
			position: absolute
			top: 40px
			width: 5px
			&.online
				background-color: $color4
			&.offline
				background-color: $color5
		.delete
			border-radius: 17px;
			display: block
			font-size: 12px
			height: 17px
			line-height: 17px;
			position: absolute
			right: 10px
			text-align: center
			top: 18px
			transition: background-color 0.3s ease
			width: 17px
			&:hover
				background-color: #ccc
</style>