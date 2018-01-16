<template>
	<div class="container">
		<div id="chat">
			<div class="row">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	// beforeRouteEnter: (to, from, next) => {
	// 	next('signin');
	// }
}
</script>
<style lang="sass">
	@import '../assets/scss/variable'
	@import '../assets/scss/helper'
	#loader
		bottom: 0
		left: 0
		position: absolute
		right: 0
		text-align: center
		.cube1
			background-color: $color1
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
		width: 300px
		@include transform(translate(-50%, -50%))
	.form-group
		position: relative
	.has-icon
		position: absolute
		right: 10px
		top: 6px
</style>