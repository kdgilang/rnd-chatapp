'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema({
	email: {
		type: String,
		required: 'Unknow Email Address.'
	},
	name: {
		type: String,
		default: 'Easy User'
	},
	password: {
		type: String,
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

module.exports = mongoose.model('users', users)