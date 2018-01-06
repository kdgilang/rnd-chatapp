const mongoose = require('mongoose')

let users = mongoose.Schema({
	name: {
		type: String,
		required: true,
		validate: {
			validator: (v) => {
				return /\S+/.test(v);
			},
			message: '{VALUE} is not a valid name, Name should be string.'
		}
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: (v) => {
				return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
			},
			message: '{VALUE} is not valid email address, Please input valid email address.'
		}
	},
	password: {
		type: String,
		select: false,
		required: true,
		validate: {
			validator: (v) => {
				return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v);
			},
			message: '{VALUE} is not strong enough, Please contain Uppercase, Lowercase, Numeric and 8 character minimum.'
		}
	},
	// birthdate: {
	// 	type: String,
	// 	required: true,
	// 	validate: {
	// 		validator: (v)=>{
	// 			return /^(0[1-9]|[1-2]\d|3[0-1])-(0[1-9]|1[0-2])-\d\d\d\d$/.test(v);
	// 		},
	// 		message: '{VALUE} is not valid date format (dd-mm-yyyy)!'
	// 	}
	// },
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