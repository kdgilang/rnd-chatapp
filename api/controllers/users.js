'use strict'
const mongoose = require('mongoose')
const vld = require('../validations/users')
const stz = require('../sanitizer/users')
const users = mongoose.model('users')

exports.add = (req, res) => {
	var form = req.body
	 console.log('form')
	stz.addUser.map(req.sanitize)
	req.checkBody(vld.addUser)
	req.getValidationResult().then((result) => {
		if(result.isEmpty()) {
			newuser.save((err, user) => {
				if(err) 
					res.send(err)
				else
					res.json(user)
			})
		} else {
			res.json(result.array()[0])
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