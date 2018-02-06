<template>
	<div id="profile">
		<div class="form-group">
			<div class="rounded-circle mx-auto">
				<img :src="imgsrc" :alt="form.name" class="img-fluid">
				<span @click="openFile" class="fa fa-picture-o icon-changeimg"></span>
			</div>
		</div>
		<form @submit.prevent="onSubmit" id="form-user" action="javascript:;" class="form col-12">
			<input @change="updateImage" ref="img_url" class="form-control d-none" name="img_url" type="file" accept="image/*">
			<div :class="formGroup('name')">
				<input ref="name" class="form-control" v-model="form.name" type="text" name="name" placeholder="Name ...">
				<span v-html="getIcon('name')" class="has-icon"></span>
			</div>
<!-- 			<div :class="formGroup('birthday')">
				<input ref="birthday" class="form-control" v-model="form.birthday" type="date" name="birthday" placeholder="birthday ...">
				<span v-html="getIcon('birthday')" class="has-icon"></span>
			</div> -->
			<div class="form-group">
				<button class="btn btn-primary">Save</button>
			</div>
			<div v-if="isMessage" :class="isMessage ? status ? 'alert alert-success': 'alert alert-danger' : 'alert alert-primary' + '\tcol-xs-12'">
				{{message}}
			</div>
		</form>
		<Loader v-show="loader"/>
	</div>
</template>
<script>
import axios from 'axios'
import Loader from './Loader'
import store from '@/store'
export default {
	name: 'Profile',
	components: {
		Loader
	},
	data () {
		return {
			title: 'Start Chatting',
			uri: this.$store.getters.getApiUri('user/update/'),
			urilists: this.$store.getters.getApiUri('user'),
			form: {
				name: null,
				meta: {
					img_url: []
				}
			},
			fd: new FormData(),
			imgsrc: null,
			status: false,
			isSubmit: false,
			isMessage: false,
			message: null,
			elerror: null,
			loader: false,
		}
	},
	methods: {
		onSubmit(e) {
			var that = this;
			that.isSubmit = true;
			that.loader = true;
			this.fd.set('name', this.form.name);
			this.fd.set('meta.img_url', this.form.meta.img_url);
			this.$store.dispatch('postApi', {
				url: that.uri,
				data: that.fd,
				type: 'multipart/form-data',
				success: (res) => {
					that.isSubmit = false;
					that.isMessage = true;
					that.loader = false;
					that.message = res.data.msg;
					that.status = res.data.status;
				},
				error: (err) => {
					that.isMessage = true;
					that.loader = false;
					that.message = err.response.data.msg;
					that.elerror =  err.response.data.param;
					that.status = err.response.data.status;
					that.$refs[that.elerror].focus();
				}
			});
		},
		openFile() {
			this.$refs.img_url.click()
		},
		updateImage(e) {
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.fd.set('newimg', files[0]);
			this.createImage(files[0]);
		},
		createImage(file) {
			var reader = new FileReader();
			var vm = this;
			reader.onload = (e) => {
				vm.loader = false;
				vm.imgsrc = e.target.result;
			};
			reader.onloadstart = (e) => {
				vm.loader = true;
			};
			reader.readAsDataURL(file);
	    },
		getIcon(el) {
			return (el === this.elerror) ? '<span class="form-control-feedback fa fa-times"></span>' : '';
		},
		formGroup(el) {
			let cf = 'form-group';
			cf += (this.isMessage) ? (!this.status && this.elerror === el) ? ' has-danger' : ' has-succes' : '';
			return cf;
		}
	},
	created: function() {
		console.log(__dirname)
		let that = this;
		this.$store.dispatch('getApi', {
			url: this.urilists,
			success: (res) => {
				if(res.data[0] !== undefined) {
					that.form = Object.assign({},res.data[0]);
					that.imgsrc = that.form.meta.img_url;
				}
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
}
</script>
<style scoped lang="sass">
#form-user
	padding-bottom: 20px
	padding-top: 20px
.form-group
	margin-bottom: 0
	margin-top: 30px
	.rounded-circle
		border: 1px solid #ccc
		height: 100px
		overflow: hidden
		position: relative
		width: 100px
		.icon-changeimg
			background-color: rgba(#fff, 0.5)
			bottom: 0
			color: #333
			display: block
			padding: 8px 10px
			position: absolute
			transition: background 0.2s ease
			text-align: center
			width: 100%
			&:hover
				cursor: pointer
				background-color: rgba(#fff, 1)
</style>