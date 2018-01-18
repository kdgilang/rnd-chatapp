'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const vld = require('../validations/users')
const stz = require('../sanitizer/users')
const users = mongoose.model('users')

exports.add = (req, res) => {
	var form = req.body, newuser;
	stz.addUser.map(req.sanitize)
	req.checkBody(vld.addUser)
	req.getValidationResult()
	.then((result) => {
		if(result.isEmpty()) {
			bcrypt.hash(form.password, 10, (err, hash) => {
				bcrypt.compare(form.repassword, hash, (err, status) => {
					if(status) {
						form.password = hash;
						newuser = new users(form)
						newuser.save((err, user) => {
							if(err) 
								if(err.code === 11000)
									res.status(400).json({msg: 'Email has ben registered.', status: false, param:'email'})
								else 
									res.status(400).json({msg: 'Something gone wrong.', status: false})
							else
								res.status(201).json({msg: 'Successfully Created.', status:true})
						})
					} else {
						res.status(400).json({msg: 'Repassword does not match.', status: false, param:'repassword'})
					}
				})
			})
		} else {
			res.status(400).json(result.array()[0])
		}
	})
}
exports.listsPrivate = (req, res) => {
	users.find(function (err, listusers) {
		if(err)
			res.status(400).send(err)
		else
			res.status(200).json(listusers)
	})
}
exports.listsPublic = (req, res) => {
	users.find({}, {_id: 0, email: 0, __v:0}).exec((err, listusers) => {
		if(err)
			res.status(400).send(err)
		else
			res.status(200).json(listusers)
	})
}