'use strict'
const mongoose = require('mongoose')
const vld = require('../validations/users')
const stz = require('../sanitizer/users')
const users = mongoose.model('users')

exports.add = (req, res) => {
	var form = req.body, newuser;
	stz.addUser.map(req.sanitize)
	req.checkBody(vld.addUser)
	req.getValidationResult().then((result) => {
		if(result.isEmpty()) {
			newuser = new users(form)
			newuser.save((err, user) => {
				if(err) 
					res.status(400).json(err)
				else
					res.status(201).json(user)
			})
		} else {
			res.status(400).json(result.array()[0])
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