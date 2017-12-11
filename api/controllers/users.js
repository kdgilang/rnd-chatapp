'use strict'
const mongoose = require('mongoose')
const vld = require('../validations/users')
const users = mongoose.model('users')

exports.add = (req, res) => {
	console.log(req.body);
	var form = req.body,
		newuser = req.sanitize(req.body);
	req.check(vld.addUser)
	req.getValidationResult().then((result) => {
		if(result.isEmpty()) {
			newuser.save((err, user) => {
				if(err) 
					res.send(err)
				else
					res.json(user)
			})
		} else {
			res.json(result)
		}
	})
}
exports.lists = (req, res) => {
	users.find(function (err, listusers) {
		if(err)
			res.send(err)

		res.json(listusers)
	})
}