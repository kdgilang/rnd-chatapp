<template>
	<div class="container-login">
		<h1 class="text-center title">{{title}}</h1>
		<span id="icon-chat" class="fa fa-comments-o"></span>
		<div class="form-login row">
			<form :action="urlRegister" class="form col-12 col-sm-6">
				<div class="form-group">
					<input class="form-control" type="text" name="email" placeholder="Email ...">
				</div>
				<div class="form-group">
					<input class="form-control" type="text" name="password" placeholder="Password">
				</div>
				<button class="btn btn-primary">Sign in</button>
			</form>
			<form :action="urlRegister" class="col-12 col-sm-6" method="post">
				<div class="form-group">
					<input class="form-control" type="text" name="name" placeholder="Name ...">
				</div>
				<div class="form-group">
					<input class="form-control" type="text" name="email" placeholder="Email ...">
				</div>
				<div class="form-group">
					<input class="form-control" type="text" name="password" placeholder="Password">
				</div>
				<div class="form-group">
					<input class="form-control" type="text" name="repassword" placeholder="Retype Password">
				</div>
				<button class="btn btn-primary">sign up</button>
			</form>
		</div>
	</div>
</template>
<script>
export default {
  name: 'FormLogin',
  data () {
    return {
      title: 'Login And Start Chatting',
      urlRegister: 'http://localhost:3000/users/add'
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
		width: 600px
		@include transform(translate(-50%, -50%))
</style>