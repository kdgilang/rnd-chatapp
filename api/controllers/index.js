const stz = require('../sanitizer');
const users = require('../models/users');
const vld = require('../validations');
const hp = require('../helper');

exports.sendActivation = (req, res) => {
	var form = req.body;
	stz.sendActivation.map(req.sanitize);
	req.checkBody(vld.sendActivation);
	req.getValidationResult()
	.then((result) => {
		if(result.isEmpty()) {
			users.findOne({email: form.email}, function (err, user) {
				if(err)
					console.log(err);
				if(user!== null) {
					if(!user.activation.status) {
						let key = users.methods.getKey(user);
						user.url = user.getUrlKey(key);
						hp.sendMail({to: form.email, subject:'Activation Account', html: hp.activationHtml(user)});
						res.status(200).json({msg: 'Activation successfully sent.', status: true});
					} else 
						res.status(400).json({msg: 'Account already active.', status: false});
				} else 
					res.status(400).json({msg: 'Email does not exists.', status: false});
			});
		} else {
			res.status(400).json(result.array()[0]);
		}
	});
}
exports.verifyEmail = (req, res) => {
	var data = (req.body) ? req.body.data : false;
	var status = false;
	if(data) {
		let dedata = hp.base64.decode(data).split(" ");
		users.findOne({email: dedata[0]}, {'email':'1', 'activation.key':'1','activation.status':1}, function(err, user) {
			if(user !== null) {
				let isMatch = user.getCompare(data, user.activation.key);
				if(isMatch && !user.activation.status) {
					status = true;
				}
			}
			if(status) {
				user.activation.status = status;
				user.save();
				res.status(200).json({status: true, msg: 'Email successfull verifyed.'});
			} else {
				res.status(400).json({status: false, msg: 'Bad request.'});
			}
		});
	}
}
exports.message = (req, res) => {
	const io = req.io;
	io.sockets.emit('message', {user: req.user, message: req.body.message});
	res.sendStatus(201);
}