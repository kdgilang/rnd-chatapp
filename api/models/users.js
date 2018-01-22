const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cfg = require('../config');
const hp = require('../helper');

let users = mongoose.Schema({
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
	username: {
		type: String,
		unique: {
			args: true,
			message: 'Username must be unique.'
		},
		required: {
			arg: true,
			msg: 'Username is required.'
		},
		validate: {
			validator: (v) => {
				return /^[a-zA-Z0-9.\_]{4,30}$/.test(v);
			},
			message: '{VALUE} is not valid, User name only allows string, numeric and underscore.'
		}
	},
	email: {
		type: String,
        unique: {
            args: true,
            message: 'Email must be unique.',
        },
		required: {
			arg: true,
			msg: 'Email is required.'
		},
		validate: {
			validator: (v) => {
				return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
			},
			message: '{VALUE} is not valid email address, Please input valid email address.'
		}
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
		validate: {
			validator: (v) => {
				return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v);
			},
			message: '{VALUE} is not strong enough, Please contain Uppercase, Lowercase, Numeric and 8 character minimum.'
		}
	},
	activation: {
		key: {
			type: String,
			required: true,
			default: false
		},
		status: {
			type: Boolean,
			default: false
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
});
users.methods.getPassword = (pass) => {
	return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}
users.methods.getCompare = (repass, hash) => {
	return bcrypt.compareSync(repass, hash);
}
users.methods.getActivationKey = (user) => {
	let actkey = user.email +"-"+Date.now();
	let bskey = hp.base64.encode(actkey);
	actkey = bcrypt.hashSync(String(actkey), bcrypt.genSaltSync(10));
	// this.update({ _id: id }, { $set: { }});
	user.url = 'http://localhost:8080/activation/'+actkey;
	let html = hp.activationHtml(user);
	hp.sendMail({from:cfg.AppName, to: user.email, subject:'Activation Account', html: html});
	return actkey;
}
module.exports = mongoose.model('users', users);