const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const hp = require('../helper');
const ObjectId = mongoose.Schema.Types.ObjectId;
let messages = mongoose.Schema({
	name: {
		type: String,
		validate: {
			validator: (v) => {
				return /\S+/.test(v);
			},
			message: '{VALUE} is not a valid name, {VALUE} should be string.'
		}
	},
	body:{
		type: String,
		validate: {
			validator: (v) => {
				return /\S+/.test(v);
			},
			message: '{VALUE} is not a valid name, {VALUE} should be string.'
		}
	},
	userid:{
		type: ObjectId,
		ref: 'users'
	},
	to: {
		type: ObjectId,
		ref: 'users'
	},
	meta: {
		status_message: {
			type: Boolean,
			default: true
		}
	},
	date: {
		created: {
			type: Date,
			default: Date.now
		},
		updated: {
			type: Date,
			default: Date.now
		}
	}
});
module.exports = mongoose.model('messages', messages);