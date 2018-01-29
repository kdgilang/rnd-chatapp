const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const hp = require('../helper');
const ObjectId = mongoose.Schema.Types.ObjectId;
let mesasges = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required.'],
		validate: {
			validator: (v) => {
				return /\S+/.test(v);
			},
			message: '{VALUE} is not a valid name, Name should be string.'
		}
	},
	users: {
		author: [{
			type: ObjectId,
			ref: 'users'
		}],
		member: [{
			type: ObjectId,
			ref: 'users'
		}]
	},
	meta: {
		type_message: {
			type: String,
		},
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
messages.methods.relationAuthor = (userid, message) => {
	message.users.author.push(userid);
}
messages.methods.relationMember = (userid, message) => {
	message.users.member.push(userid);
}
module.exports = mongoose.model('messages', messages);