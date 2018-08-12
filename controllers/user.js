const {
	promisify
} = require('util');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');
const randomstring = require('randomstring');
const randomBytesAsync = promisify(crypto.randomBytes);
const fs = require('fs');
const nodemailer = require('nodemailer');
var GoogleCloudStorage = require('@google-cloud/storage');
var storage = new GoogleCloudStorage({
  projectId: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_STORAGE_KEYFILE_NAME
});
var myBucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);


const AWS = require('aws-sdk');


//---------HOME----------------
exports.postIndex = (req, res, next) => {
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('', 'Password must be at least 4 characters long').len(4);
	req.assert('confirmpassword', 'Passwords do not match').equals(req.body.password);
	req.sanitize('email').normalizeEmail({
		gmail_remove_dots: false
	});
	const errors = req.validationErrors();
	if (errors) {
		req.flash('errors', errors);
		console.log(errors);
		return res.redirect('/signup');
	}

	const secretToken = randomstring.generate();
	var confirmurl = 'http://localhost:8080/verifyemail?token='+secretToken;
	const user = new User({
		firstname: req.body.firstname,
		lastname:req.body.lastname,
		email: req.body.email,
		password: req.body.password,
		emailSecretToken: secretToken,
		emailActive: false,
	});

	User.findOne({
		email: req.body.email
	}, (err, existingUser) => {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			req.flash('errors', {
				msg: 'Account with that email address already exists.'
			});
			return res.redirect('/signup');
		}
		var transporter = nodemailer.createTransport({
			debug: false,
		    requireTLS: true,
		    port: 25,
		    secureConnection: false,
		    service: 'gmail',
			auth: {
				user: 'jennyxu8448@gmail.com',
				pass: 'xu1029!~'
			},
		    tls: {
		        ciphers:'SSLv3',
		        rejectUnauthorized: false
		    }
		  
		});

		var mailOptions = {
		  from: 'jennyxu8448@gmail.com',
		  to: req.body.email,
		  subject: 'Sending Email using Node.js',
		  text: '<p>Thanks for registering with Hackermatcher!</p><p>Please click this link to confirm your email:<a>'+confirmurl+'</a></p>'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log("\x1b[31m",error);
		  } else {
		    console.log("\x1b[32m", 'Email sent: ' + info);
		  }
		});

		user.save((err) => {
			if (err) {
				return next(err);
			}
			
			res.render('account/verifyemail',{
				title: 'Verify Email'
			});

/*
			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}
				res.render('account/signup',{
				"title":"Signup", "css":["signup.css"], "js":["signup.js"]
				});
			});
			*/

		});
	});
};

exports.verifyemail = async (req, res) => {
	console.log('in tester');
	var secretToken = req.query.token;
	console.log(secretToken);
	User.findOne({'emailSecretToken' : secretToken}, function(err, user){
		if(err) throw err;
		if(!user){
			throw new Error("User not found");
		}
		user.emailActive = true;
		user.emailSecretToken = '';
		
		var userId = user.firstname+'.'+user.lastname;
		var duplicateID = true;
		var count = 0;
		//TODO: async loop for assigning id to user
		User.findOne({'id': userId}, function(err, person){
			if(err) throw err;
			if(!person){
				duplicateID = false;
				user.urlId = userId;
				console.log('setting userid success');
				user.save((err) => {
					if (err) {
						return next(err);
					}
					console.log('You email is verified, you may now log in');
					req.logIn(user, (err) => {
						if (err) {
							return next(err);
						}
					
						res.render('account/signup');
					});
				});
			}else{
				count++;
				userId = user.firstname+'.' + user.lastname + '.' + count;
			}
		});
		
		
	});
};

exports.getVerifyEmail = (req, res) =>{
	console.log('in getVerifyEmail');
	User.findOne({'emailSecretToken' : secretToken}, function(err, user){
		if(err) throw err;
		if(!user){
			req.flash('error', 'no user found');
		}
		user.emailActive = true;
		user.emailSecretToken = '';
		req.flash('success', 'You email is verified, you may now log in');
	});
	
};
exports.postVerifyEmail = async (req, res, next) => {
	try {
		const {
			secretToken
		} = req.body;
		console.log(secretToken);

		//find the account that matches the secret token
		const user = await User.findOne({
			'emailSecretToken': secretToken
		});
		console.log(user);
		if (!user) {
			console.log('no user is found');
			req.flash('error. no user found for that secret token');
			res.redirect('/verify');
			return;
		}
		user.emailActive = true;
		user.emailSecretToken = '';
		await user.save();

		req.flash('Verification succeeded. You may login now.');
		res.redirect('/login');
	} catch (error) {
		next(error);
	}
}

//----------LOGIN--------------
exports.postLogin = (req, res, next) => {
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('password', 'Password cannot be blank').notEmpty();
	req.sanitize('email').normalizeEmail({
		gmail_remove_dots: false
	});

	const errors = req.validationErrors();
	if (errors) {
		console.log(errors);
		req.flash('errors', errors);
		return res.redirect('/');
	}

	passport.authenticate('local', (err, user, info) => {
		if (err) {
			req.flash('errors', errors);
			return next(err);
		}
		if (!user) {
			console.log(info);
			req.flash('errors', info);
			return res.redirect('/');
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			console.log('login success');
			req.flash('success', {
				msg: 'Success! You are logged in.'
			});

			res.render('account/signup');

			//TODO: What is this?
      //res.redirect(req.session.returnTo || '/');
		});
	})(req, res, next);
};
exports.logout = (req, res) => {
	req.logout();
	req.session.destroy((err) => {
		if (err) console.log('Error : Failed to destroy the session during logout.', err);
		req.user = null;
		res.redirect('/');
	});
};

//---------SIGNUP-----------
exports.getSignup = (req, res) => {
	res.render('account/signup',{
		"title":"Signup"
	});
}

exports.postPFPUpload = (req, res, next) =>{
	var localReadStream = fs.createReadStream(req.file.path);
	const gcsname = Date.now() + req.file.originalname;
	var image = myBucket.file(gcsname);
	localReadStream.pipe(image.createWriteStream({
	    metadata: {
	      contentType: 'image/jpeg',
	      metadata: {
	        custom: 'metadata'
	      }
	    }
	})).on('error', function(err) {console.log(err);})
	  .on('finish', function() {
	    console.log('upload finished!');
	    myBucket.file(gcsname).makePublic().then(() =>{
	      console.log('upload to gcloud success!');
	    });
	  });
};

var getPublicUrl = file_name => {
  return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${file_name}`
}

exports.saveToS3 = (req,res,next) =>{
	var file = req.file;
	console.log(file);
	var fileName = req.file.path;
	fs.readFile(fileName, (err, data) => {
	 if (err) throw err;
	 const params = {
	     Bucket: BUCKET_NAME, // pass your bucket name
	     Key: file.originalName, // file will be saved as testBucket/contacts.csv
	     Body: JSON.stringify(data, null, 2)
	 };
	 s3.upload(params, function(s3Err, data) {
	     if (s3Err) throw s3Err
	     console.log(`File uploaded successfully at ${data.Location}`)
	 });
	});
};

var uploadToGCloud = async(file) => {
	var localReadStream = fs.createReadStream(file.path);
	const gcsname = Date.now() + file.originalname;
	var image = myBucket.file(gcsname);
	localReadStream.pipe(image.createWriteStream({
	    metadata: {
	      contentType: 'image/jpeg',
	      metadata: {
	        custom: 'metadata'
	      }
	    }
	})).on('error', function(err) {console.log(err);})
	  .on('finish', function() {
	    console.log('upload finished!');
	    myBucket.file(gcsname).makePublic().then(() =>{
	      console.log('upload to gcloud success!');
	      
	    });
	  });
};

exports.postSignup = async (req, res, next) => {
	console.log(req.body);
	User.findOne({
		email: req.user.email
	}, (err, user) => {
		if (err) {
			return next(err);
		}

		user.school = req.body.school || '';
		user.major = req.body.major || '';
		user.graduationYear = req.body.graduationYear || '';
		user.educationLevel = req.body.educationLevel || '';
		user.numOfHackathons = req.body.numOfHackathons || 0;
		console.log(req.body.hackYear);
		console.log(req.body.hackathon);
		if(req.body.hackathon){
		var hackathonArr = [];
		for(h = 0; h < req.body.hackathon.length; h++){
			var arr = [];
			arr.push(req.body.hackYear[h]);
			arr.push(req.body.hackathon[h]);
			hackathonArr.push(arr);
		}
			user.hackathons = hackathonArr;
		}else{
			user.hackathons = [];
		}

		if(req.body.interests){
			var interests = [];
			for(k = 0; k < req.body.interests.length; k++){
				var ints = [];
				ints.push(req.body.interests[k]);
				ints.push(10);
				interests.push(ints);
			}
			user.preferences.interests = interests;
		}else{
			user.preferences.interests = [];
		}
		if(req.body.languages){
			var languages = [];
			for(k = 0; k < req.body.languages.length; k++){
				var ints = [];
				ints.push(req.body.languages[k]);
				ints.push(10);
				languages.push(ints);
			}
			user.preferences.languages = languages;
		}else{
			user.preferences.languages = [];
		}
		if(req.body.technologies){
			var technologies = [];
			for(k = 0; k < req.body.technologies.length; k++){
				var ints = [];
				ints.push(req.body.technologies[k]);
				ints.push(10);
				technologies.push(ints);
			}
			user.preferences.technologies = technologies;
		}else{
			user.preferences.technologies = [];
		}
		if(req.body.fields){
			var fields = [];
			for(k = 0; k < req.body.fields.length; k++){
				var ints = [];
				ints.push(req.body.fields[k]);
				ints.push(10);
				fields.push(ints);
			}
			user.preferences.fields = fields;
		}else{
			user.preferences.fields = [];
		}
		
		user.preferences.hobbies = req.body.hobbies || [];
		
		user.website = req.body.website || '';
		user.devpost = req.body.devpost || '';
		user.phone = req.body.phone || '';
		user.facebook = req.body.github || '';
		user.instagram = req.body.instagram || '';
		user.linkedin = req.body.linkedin || '';
		user.github = req.body.github || '';

		const file = req.file;
		if(file){
			var localReadStream = fs.createReadStream(file.path);
			const gcsname = Date.now() + file.originalname;
			var image = myBucket.file(gcsname);
			localReadStream.pipe(image.createWriteStream({
			    metadata: {
			      contentType: 'image/jpeg',
			      metadata: {
			        custom: 'metadata'
			      }
			    }
			})).on('error', function(err) {console.log(err);})
			.on('finish', function() {
			    myBucket.file(gcsname).makePublic().then(() =>{
					console.log('upload to gcloud success!');
					user.profileimg = getPublicUrl(gcsname);

					user.save((err) => {
						if (err) {
							return next(err);
						}
						res.render('account/dashboard', {
							title: 'Dashboard'
						});
					});
			    });
			  });
		}else{
			user.save((err) => {
				if (err) {
					return next(err);
				}
				res.render('account/dashboard', {
					title: 'Dashboard'
				});
			});
		}


		
	});
}



//---------dashboard--------------
//Gets user based on url query key. If id is equal to req.user, enables settings button
exports.getProfile = (req, res) => {
	console.log('in getUserById');
	var id = req.params.id;
	if(id === req.user.urlId){
		console.log('current user!');
		res.render('account/dashboard', {
			title: 'Account Management', dashboardUser: req.user, settingsEnabled: true
		});
	}else{
		User.findOne({'urlId': req.params.id}, (err, user, next) => {
			if (err) {
				return next(err);
			}
			res.render('account/dashboard', {
				title: 'Account Management', dashboardUser: user, settingsEnabled: false
			});
		});
	}
	/*
	User.findById(id, (err, user, next) => {
		if (err) {
			return next(err);
		}
		res.render('account/dashboard', {
			title: 'Account Management', dashboardUser: user, css: 'profile.css', js: 'profile.js'
		});
	});
	*/
};

//Post profile changes to database
exports.postProfile = (req, res, next) => {
	console.log('in postProfile');
	console.log(req.body);
	
/*	req.assert('email', 'Please enter a valid email address.').isEmail();
	req.sanitize('email').normalizeEmail({
		gmail_remove_dots: false
	});

	const errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/account');
	}

	User.findById(req.user.id, (err, user) => {
		if (err) {
			return next(err);
		}
		user.email = req.body.email || '';
		user.profile.name = req.body.name || '';
		user.profile.gender = req.body.gender || '';
		user.profile.location = req.body.location || '';
		user.profile.website = req.body.website || '';
		user.save((err) => {
			if (err) {
				if (err.code === 11000) {
					req.flash('errors', {
						msg: 'The email address you have entered is already associated with an account.'
					});
					return res.redirect('/account');
				}
				return next(err);
			}
			req.flash('success', {
				msg: 'Profile information has been updated.'
			});
			res.redirect('/account');
		});
	});*/
};


exports.getPreferences = (req, res) => {
	res.render('account/preferences', {
		title: 'Preferences', dashboardUser: req.user, js:'preferences.js', css:'preferences.css'
	});
};

exports.postPreferences = (req,res) => {
	var interests = req.body.interests;
	var languages = req.body.languages;
	var technologies = req.body.technologies;
	var fields = req.body.fields;
	var interestScore = req.body.interestScore;
	var languageScore =req.body.languageScore;
	var techScore = req.body.techScore;
	var fieldScore = req.body.fieldsScore;

	console.log("\x1b[1m", req.body);
	//var email = req.user.email;
	var email = 'kaleigh@gmail.com';
	User.updateOne({'email': email}, {$set: {
		'preferences.interests': interests,
		'preferences.languages' : languages,
		'preferences.technologies': technologies,
		'preferences.fields': fields,
		'careScores.interests' : interestScore,
		'careScores.technologies': techScore,
		'careScores.fields':fieldScore,
		'careScores.languages':languageScore
	}}, function(err, user){
		if(err) throw err;
		console.log("\x1b[35m", user);
	});
};



//-------account-----------
exports.postUpdatePassword = (req, res, next) => {
	req.assert('password', 'Password must be at least 4 characters long').len(4);
	req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/account');
	}

	User.findById(req.user.id, (err, user) => {
		if (err) {
			return next(err);
		}
		user.password = req.body.password;
		user.save((err) => {
			if (err) {
				return next(err);
			}
			req.flash('success', {
				msg: 'Password has been changed.'
			});
			res.redirect('/account');
		});
	});
};
exports.postDeleteAccount = (req, res, next) => {
	User.remove({
		_id: req.user.id
	}, (err) => {
		if (err) {
			return next(err);
		}
		req.logout();
		req.flash('info', {
			msg: 'Your account has been deleted.'
		});
		res.redirect('/');
	});
};
exports.getOauthUnlink = (req, res, next) => {
	const {
		provider
	} = req.params;
	User.findById(req.user.id, (err, user) => {
		if (err) {
			return next(err);
		}
		user[provider] = undefined;
		user.tokens = user.tokens.filter(token => token.kind !== provider);
		user.save((err) => {
			if (err) {
				return next(err);
			}
			req.flash('info', {
				msg: `${provider} account has been unlinked.`
			});
			res.redirect('/account');
		});
	});
};
exports.getReset = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	User
		.findOne({
			passwordResetToken: req.params.token
		})
		.where('passwordResetExpires').gt(Date.now())
		.exec((err, user) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				req.flash('errors', {
					msg: 'Password reset token is invalid or has expired.'
				});
				return res.redirect('/forgot');
			}
			res.render('account/reset', {
				title: 'Password Reset'
			});
		});
};
exports.postReset = (req, res, next) => {
	req.assert('password', 'Password must be at least 4 characters long.').len(4);
	req.assert('confirm', 'Passwords must match.').equals(req.body.password);

	const errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('back');
	}

	const resetPassword = () =>
		User
		.findOne({
			passwordResetToken: req.params.token
		})
		.where('passwordResetExpires').gt(Date.now())
		.then((user) => {
			if (!user) {
				req.flash('errors', {
					msg: 'Password reset token is invalid or has expired.'
				});
				return res.redirect('back');
			}
			user.password = req.body.password;
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			return user.save().then(() => new Promise((resolve, reject) => {
				req.logIn(user, (err) => {
					if (err) {
						return reject(err);
					}
					resolve(user);
				});
			}));
		});

	const sendResetPasswordEmail = (user) => {
		if (!user) {
			return;
		}
		const transporter = nodemailer.createTransport({
			service: 'SendGrid',
			auth: {
				user: process.env.SENDGRID_USER,
				pass: process.env.SENDGRID_PASSWORD
			}
		});
		const mailOptions = {
			to: user.email,
			from: 'hackathon@starter.com',
			subject: 'Your Hackathon Starter password has been changed',
			text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
		};
		return transporter.sendMail(mailOptions)
			.then(() => {
				req.flash('success', {
					msg: 'Success! Your password has been changed.'
				});
			});
	};

	resetPassword()
		.then(sendResetPasswordEmail)
		.then(() => {
			if (!res.finished) res.redirect('/');
		})
		.catch(err => next(err));
};
exports.getForgot = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	res.render('account/forgot', {
		title: 'Forgot Password'
	});
};
exports.postForgot = (req, res, next) => {
	req.assert('email', 'Please enter a valid email address.').isEmail();
	req.sanitize('email').normalizeEmail({
		gmail_remove_dots: false
	});

	const errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/forgot');
	}

	const createRandomToken = randomBytesAsync(16)
		.then(buf => buf.toString('hex'));

	const setRandomToken = token =>
		User
		.findOne({
			email: req.body.email
		})
		.then((user) => {
			if (!user) {
				req.flash('errors', {
					msg: 'Account with that email address does not exist.'
				});
			} else {
				user.passwordResetToken = token;
				user.passwordResetExpires = Date.now() + 3600000; // 1 hour
				user = user.save();
			}
			return user;
		});

	const sendForgotPasswordEmail = (user) => {
		if (!user) {
			return;
		}
		const token = user.passwordResetToken;
		const transporter = nodemailer.createTransport({
			service: 'SendGrid',
			auth: {
				user: process.env.SENDGRID_USER,
				pass: process.env.SENDGRID_PASSWORD
			}
		});
		const mailOptions = {
			to: user.email,
			from: 'jennyxu8448@gmail.com',
			subject: 'Reset your password on Hackathon Starter',
			text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
		};
		return transporter.sendMail(mailOptions)
			.then(() => {
				req.flash('info', {
					msg: `An e-mail has been sent to ${user.email} with further instructions.`
				});
			});
	};

	createRandomToken
		.then(setRandomToken)
		.then(sendForgotPasswordEmail)
		.then(() => res.redirect('/forgot'))
		.catch(next);
};
