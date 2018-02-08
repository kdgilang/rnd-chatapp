const cfg = require('../config');
const nodemailer = require('nodemailer');
const fs = require('fs');

// helper as email service
exports.sendMail = (option) => {
  option.from = cfg.AppName;
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: cfg.authEmail
  });
  transporter.sendMail(option, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    transporter.close();
  });
}
exports.base64 = {
  encode: (str) => {
    return new Buffer(str, 'binary').toString('base64');
  }, 
  decode: (bs64) => {
    return new Buffer(bs64, 'base64').toString('binary');
  }
}
module.exports.getDirUri = (req, path) => {
    return req.protocol+"://"+req.get('host')+path;
}
module.exports.createDir = (fds) => {
  if(typeof fds === 'object' ) {
    for(var key in fds) {
      let fd = cfg.DIR.root+"/"+fds[key];
      fs.open(fd, 'r+', function (err) {
        if(err !== null && err.code === 'ENOENT') {
          fs.mkdirSync(fd, '0o777');
        }
      });
    }
  } else {
    return false;
  }
}
exports.activationHtml = require('./content-activation');