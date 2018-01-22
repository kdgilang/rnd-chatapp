const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const vld = require('../validations/users')
const stz = require('../sanitizer/users')
const users = require('../models/users');
exports.cors = (req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
exports.verify = (req, res, next) => {
    var auth = req.headers['authorization'];
    if(typeof auth === undefined) {
        res.sendStatus(403);
    } else {
        let bearer = auth.split('.');
        req.token = bearer;
        next();
    }
}
exports.auth = (req, res, next) => {
    let data = req.body;
    stz.authUser.map(req.sanitize);
    req.checkBody(vld.authUser);
    req.getValidationResult()
    .then((result) => {
        if(result.isEmpty()) {
            users.findOne({email: data.email},{email:1,password:1}).exec()
            .then((m) => {
                let status = bcrypt.compareSync(data.password, m.password);
                console.log(data.password);
                console.log(m.password);
                if(m !== null && status) {
                    if(m.activation.status)
                        next();
                    else
                        res.status(403).json({msg: 'Please verify your email adress.', param: 'email', status: false, verify: false});
                } else {
                    res.status(400).json({msg: 'Invalid Cridentials.', param: 'email', status: false});
                }
            });
        } else {
            res.status(400).json(result.array()[0]);
        }
    });
}
exports.genereteToken = (req, res) => {
    console.log('user');
    jwt.sign({});
}