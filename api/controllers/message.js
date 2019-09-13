const Musers = require('../models/user');
const Mmsg = require('../models/message');
const vld = require('../validations');
const hp = require('../helper');

exports.message = (req, res) => {
	const io = req.io;
	const cuser = req.user;
	const msg = req.body;
	io.sockets.emit('message', {user: req.user, message: req.body});
	let messages = {
		name: cuser.email,
		body: msg.body,
		userid: cuser.id
	}
	if (msg.to) {
		Musers.findOne({email: msg.to}, (err, user) => {
			if(err)
				throw err;
			messages.to = user._id;
			let newmsg = new Mmsg(messages);
			newmsg.save((err, msg) => {
				if(err)
					throw err;
				else
					res.status(201).json({msg: 'Message saved.', status:true});
			});
		});
	} else {
		res.status(404).json({msg: 'No Destination.', status:false});
	}
}

exports.getMessage = (req, res) => {
	const cuser = req.user;
	Mmsg.find({}, (err, messages) => {
		if(err)
			throw err;
		res.status(200).json(messages);
	});
}