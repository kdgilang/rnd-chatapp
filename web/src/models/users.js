const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	} 
})

mongoose.model('users', UserSchema)

