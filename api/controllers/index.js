const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const vld = require('../validations/users')
const stz = require('../sanitizer/users')
const users = mongoose.model('users');

exports.auth = (req, res) => {
	let data = req.body;
	stz.authUser.map(req.sanitize);
	req.checkBody(vld.authUser);
	req.getValidationResult()
	.then((result) => {
		if(result.isEmpty()) {
			users.findOne({email: data.email}).exec()
			.then((result) => {
				console.log(result)
				// if(err)
				// 	res.status(400).json({msg: 'Invalid Cridentials.', status: false});
				// else
				// 	if(user.length > 0)
				// 		res.status(200).json({msg: 'Sign in Successfull.', status:true});
				// 	else
				// 		res.status(400).json({msg: 'Invalid Cridentials.', status: false});
			});
			bcrypt.hash(data.password, 10, (err, hash) => {
				console.log(data.password)
				console.log(hash)
			});
		} else {
			res.status(400).json(result.array()[0]);
		}
	});
}