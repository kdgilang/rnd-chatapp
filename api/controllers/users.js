'use strict'
const mongoose = require('mongoose')
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
			if(req.checkBody(req.body.password).equals(req.body.repassword)) {
				newuser = new users(form)
				newuser.save((err, user) => {
					if(err) 
						res.status(400).json(err)
					else
						res.status(201);
				})
			} else {
				res.status(400).json({msg: 'Password does not match.'})
			}
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