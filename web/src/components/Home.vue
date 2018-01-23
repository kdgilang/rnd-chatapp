<template>
	<div id="chat">
		<router-view></router-view>
		<chat v-show="token !== null"/>
		<router-link :to="{name: signout}" class="signout" title="signout"><span class="fa fa-sign-out"></span></router-link>
	</div>
</template>

<script>
import chat from './Chat';
export default {
	name: 'Home',
	data() {
		return {
			token: this.$store.state.token
		}
	},
	components: {
		chat
	},
	computed: {
	}
	// beforeRouteEnter: (to, from, next) => {
	// 	next('signin');
	// }
}
</script>
<style lang="sass">
	@import '../assets/scss/variable'
	@import '../assets/scss/helper'
	.signout
		bottom: 0
		color: $color4
		font-size: 20px
		left: 5px
		position: absolute
	#loader
		bottom: 0
		left: 0
		position: absolute
		right: 0
		text-align: center
		.cube1
			background-color: $color1
	.c-form
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
	.o-form
		left: 50%
		position: absolute
		top: 50%
		width: 300px
		@include transform(translate(-50%, -50%))
	.form-group
		position: relative
	.has-icon
		position: absolute
		right: 10px
		top: 6px
</style>