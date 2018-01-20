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