'use strict'
const bcrypt = require('bcrypt')
const vld = require('../validations/users')
const stz = require('../sanitizer/users')
const users = require('../models/users')
const hp = require('../helper')

exports.add = (req, res) => {
	var form = req.body, newuser;
	stz.addUser.map(req.sanitize);
	req.checkBody(vld.addUser);
	req.getValidationResult()
	.then((result) => {
		if(result.isEmpty()) {
			let hash = bcrypt.hashSync(form.password, 10);
			let status = bcrypt.compareSync(form.repassword, hash);
			if(status) {
				var sts = {};
				new Promise((resolve, reject) => {
					users.findOne({username: form.username}, function (err, username) {
						if(username===null)
							sts.username = true;
						else 
							sts.username = false;
						if(err) {
							reject();
						} else {
							users.findOne({email: form.email}, function (err, email) {
								if(err)
									reject();
								if(email===null)
									sts.email = true;
								else
									sts.email = false;
								resolve(sts);
							});
						}
					});
				}).then((val) => {
					if(val.username && val.email) {
						form.password = hash;
						newuser = new users(form);
						newuser.save((err, user) => {
							if(err)
								console.log(err);
							else {
								let actkey = val.email + Date.now();
								console.log(String(actkey));
								actkey = bcrypt.hashSync(String(actkey), 10); 
								hp.sendMail({from:'Easy Chat', to:'kadekgilangputra@gmail.com', subject:'Activation Account', text: actkey});
								res.status(201).json({msg: 'Successfully Created.', status:true});
							}
						});
					} else {
						if(!val.username)
							res.status(400).json({msg: 'User name is taken.', status: false, param:'username'});
						else
							if(!val.email)
								res.status(400).json({msg: 'Email has ben registered.', status: false, param:'email'});
					}
				});
			} else {
				res.status(400).json({msg: 'Repassword does not match.', status: false, param:'repassword'});
			}
		} else {
			res.status(400).json(result.array()[0]);
		}
	});
}
exports.listsPrivate = (req, res) => {
	users.find(function (err, listusers) {
		if(err)
			res.status(400).send(err);
		else
			res.status(200).json(listusers);
	})
}
exports.listsPublic = (req, res) => {
	users.find({}, {_id: 0, email: 0, __v:0}).exec((err, listusers) => {
		if(err)
			res.status(400).send(err);
		else
			res.status(200).json(listusers);
	})
}