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
			users.findOne({email: form.email}, {'name': '1', 'activation.key':'1'}, function (err, user) {
				if(err)
					console.log(err);
				if(user!== null) {
					if(!user.activation.status) {
						user.url = user.getUrlKey(user.activation.key);
						let html = hp.activationHtml(user);
						hp.sendMail({to: form.email, subject:'Activation Account', html: html});
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