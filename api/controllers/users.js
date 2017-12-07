'use strict'
const mongoose = require('mongoose')
const users = mongoose.model('users')

exports.add = (req, res) => {
	console.log(req.body);
	var form = req.body,
		newuser = users(req.body)
	form.
	newusers.save((err, user) => {
		if(err) 
			res.send(err)
		else
			res.json(user)
	})
}
exports.lists = (req, res) => {
	users.find(function (err, listusers) {
		if(err)
			res.send(err)

		res.json(listusers)
	})
}