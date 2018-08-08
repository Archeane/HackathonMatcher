const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const config = require('../config/mailer');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: '345b6f38476ba60ecda452fe70a5119d-e44cc7c1-19b24ee2',
    domain: 'sandboxa266ef2878e24389a75e8a5cbaf69b0e.mailgun.org'
  },
  proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

module.exports.transport = nodemailerMailgun;

module.exports.sendMail = function(from, to, subject, html){
	nodemailerMailgun.sendMail({from, to, subject, html}, (err, info) => {
	  console.log('wtf?');
	  if (err) console.log('Error: ' + err);
	  console.log('Response: ' + info);
	});
}



/*



const transport = nodemailer.createTransport({
	service:'Mailgun',
	auth:{ 
		user: config.MAILGUN_USER,
		pass: config.MAILGUN_PASS
	},
	tls:{
		rejectUnauthorized:false
	}
});


module.exports.sendEmail = function(from, to, subject, html){
	transport.sendMail({
		from:'jennyxu1029@gmail.com', 
		to:'jennyxu8448@gmail.com',
		subject:'Please work',
		text:'I hope this got thru'
	}, (err, info) =>{
		if (err) throw err;
		console.log(info.envelope);
		console.log(info.messageId);
	})
	/*
	return new Promise((resolve,reject) => {
		transport.sendMail({from, subject, to, html}, (err,info)=>{
			if (err) reject(err);
			resolve(info);
		})
	});
	*/
//}
