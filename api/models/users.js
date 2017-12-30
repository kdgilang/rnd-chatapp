const mongoose = require('mongoose')

let usersSchema = mongoose.Schema({
	name: {
		type: String,
		default: 'Easy User'
	},
	email: {
		type: String,
		required: 'Unknow Email Address.'
	},
	password: {
		type: String,
		select: false,
		required: 'Wrong Password.'
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	updated_date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('users', usersSchema)