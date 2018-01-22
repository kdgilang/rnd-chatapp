const cfg = require('../config');
const nodemailer = require('nodemailer');

// helper as email service
exports.sendMail = (option) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: 'kadekgilangputra@gmail.com',
      pass: 'pdkqetfmviopqgjq'
    }
  });
  transporter.sendMail(option, function(error, info){
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
exports.activationHtml = require('./content-activation');