const cfg = require('../config');
const nodemailer = require('nodemailer');

// helper as email service
exports.sendMail = (option) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: cfg.authEmail
  });
  transporter.sendMail(option, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}