<template>
	<div class="container-login">
		<h1 class="text-center title">{{title}}</h1>
		<form :action="url" class="form form-login">
			<span id="icon-chat" class="fa fa-comments-o"></span>
			<div class="form-group">
				<input class="form-control" type="text" name="name" placeholder="Name ...">
			</div>
			<div class="form-group">
				<input class="form-control" type="text" name="email" placeholder="Email ...">
			</div>
			<div class="form-group">
				<input class="form-control" type="text" name="password" placeholder="Password">
			</div>
			<button class="btn btn-primary">Login</button>
		</form>
	</div>
</template>
<script>
export default {
  name: 'FormLogin',
  data () {
    return {
      title: 'Login And Start Chatting',
      url: this.$route.params.path
    }
  }
}
</script>
<style scoped lang="sass">
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
		width: 300px
		@include transform(translate(-50%, -50%))
</style>