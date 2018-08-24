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


//---------HOME----------------
/**
 * Regeisters an unverified user on database. 
 * Sends a verification email with randomly generated secret token
 * TODO: add expiration time to the secret token.
 *       Add resend email 
 *       handle flash errors
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
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
		return res.redirect('/');
	}

	const secretToken = randomstring.generate();
	var confirmurl = process.env.BASE_URL+'/verifyemail?token='+secretToken;
	const user = new User({
		firstname: req.body.firstname.replace(/\s/g, ''),
		lastname:req.body.lastname.replace(/\s/g, ''),
		name: req.body.firstname+req.body.lastname.replace(/\s/g, ''),
		email: req.body.email.replace(/\s/g, ''),
		password: req.body.password,
		emailSecretToken: secretToken,
		emailActive: false,
		urlId:''
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

		var smtpTransport = nodemailer.createTransport({
	        service: "gmail",
	        auth: {
	            user: process.env.GMAIL_LOGIN,
	            pass: process.env.GMAIL_LOGIN_PW
	        }
	    });

		var mailOptions = {
		  from: 'jennyxu8448@gmail.com',
		  to: req.body.email,
		  subject: 'Hackermatcher verification',
		  text: 'Thanks for registering with Hackermatcher! Please click this link to confirm your email:'+confirmurl
		};

		smtpTransport.sendMail(mailOptions, function(error, response){
	        if(error){
	            console.log(error);
	        }
	        console.log('mail sent success!', response);
	    });

		user.save((err) => {
			if (err) {
				return next(err);
			}
			
			res.render('message',{
				title: 'Verify Email', pageTitle: 'Please Verify Your Email', message: 'Please check your inbox for a verification email. Click <a>here</a> to resend one. '
			});
		});
	});
};


async function assignUniqueUrlId(firstname, lastname){
	console.log('in assignUniqueUrlId');
	var userId = firstname+'.'+lastname;
	var count = "1";
	let result = true;
	while(result){
		result = await User.findOne({'urlId': userId}, (err, data)=>{
			if(err) throw err;
			if(data){
				userId = firstname+'.'+lastname+"."+count;
				count++;
				return true;
			}else{
				return false;
			}
		});
	}
	console.log('final userID:', userId);
	return userId;
}
/**
 * Matches the secret token with secret token in url. 
 * Sets user to active if tokens match
 * Assigns a urlID that is UNIQUE to the user <--- fix this!! make sure its 100% unique
 * automatically logs user in and direct to signup page.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.verifyemail = async (req, res) => {
	
	var secretToken = req.query.token;

	let currentUser = await User.findOne({'emailSecretToken' : secretToken}, function(err, user){
		if(err){
			console.log("\x1b[31m", "ERROR!", err);
			res.render('message', {
				title:'Server Error', message:'An error has occured in the server. Please try again later.'
			});//end of render
			return false;
		}
		if(!user){
			res.render('message', {
				title:'Error', message:'Token is not found. Your email is either already active, or you may have copied the wrong URL?'
			});//end of render
			console.log("\x1b[31m", "ERROR!","User not found");
			return false;
		}else{
			user.emailActive = true;
			user.emailSecretToken = '';
			user.save((err) => {
				if (err) {
					return next(err);
				}
			});
		}
	});
	if(currentUser != false){
		let uniqueId = await assignUniqueUrlId(currentUser.firstname, currentUser.lastname);
		console.log('unique', uniqueId);
		User.updateOne({'email':currentUser.email}, {$set:{'urlId': uniqueId}}, function(err){
			if(err){
				console.log("\x1b[31m", "ERROR!", err);
				res.render('message', {
					title:'Server Error', message:'An error has occured in the server. Please try again later.'
				});//end of render
			}else{
				res.render('message', {
					title:'Verification Success', message:'Verification Success. You will now be taken to a signup page.'
				}, () =>{
					req.logIn(currentUser, (err) => {
						if (err) {
							return next(err);
						}
					
						res.redirect('/signup');
						return;
					});
				});//end of render
			}//end of else
		});//end of update
	}//end of if


/*	
		var userId = user.firstname+'.'+user.lastname;
		var duplicateID = true;
		var count = 0;
		//TODO: async loop for assigning id to user
		await User.findOne({'id': userId}, function(err, person){
			if(err) throw err;
			if(!person){
				duplicateID = false;
				user.urlId = userId;
				
				user.save((err) => {
					if (err) {
						return next(err);
					}
					
					res.render('account/message', {
						title:'Verification Success', message:'Verification Success. You will now be taken to a signup page.'
					}, () =>{
						req.logIn(user, (err) => {
							if (err) {
								return next(err);
							}
						
							res.redirect('/signup');
							return;
						});
					});
					
				});
			}else{
				count++;
				userId = user.firstname+'.' + user.lastname + '.' + count;
				user.save((err) => {
					if (err) {
						return next(err);
					}
					
					res.render('account/message', {
						title:'Verification Success', message:'Verification Success. You will now be taken to a signup page.'
					}, () =>{
						req.logIn(user, (err) => {
							if (err) {
								return next(err);
							}
						
							res.redirect('/signup');
							return;
						});
					});
					
				});
			}
		});
*/	
		
}; //end of route



//----------LOGIN--------------
/**
 * Checks if user passwords matches the one in database
 * Checks if user email is verified
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
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
			res.redirect('/');
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
/**
 * Get the signup page after user regesisters and verifies their email.
 * Only accessabile to logged in users.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getSignup = (req, res) => {
	if(!req.user){
		res.render('message', {
			title: "Invalid Login", pageTitle: "Please register your email.", message: "You are not logged in. Please login or register your email first. "
		})
	}else{
		res.render('account/signup',{
			"title":"Signup"
		});
	}
}

var getPublicUrl = file_name => {
  return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${file_name}`
}
/*
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
*/

/**
 * updates fields in user on DB. School, major, gradYear, eduLevel are required. Optional fields
 * include preferences, social profiles, and profile image.
 * If profile image is in the form, the image is saved to gcloud and a link to the image is generated.
 * The generated link is stored in DB.
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
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
		
		if(req.body.hackathon){
			//TODO: handle error for this
			var parsedHacks;
			//try{
				parsedHacks = JSON.parse(req.body.user);
			//}
			user.hackathons = parsedHacks;
	/*var hackathonArr = [];
		for(h = 0; h < req.body.hackathon.length; h++){
			var arr = [];
			arr.push(req.body.hackYear[h]);
			arr.push(req.body.hackathon[h]);
			hackathonArr.push(arr);
		}
			user.hackathons = hackathonArr;*/
		}else{
			user.hackathons = [];
		}


		if(req.body.interests){
			var interests = [];
			if(typeof req.body.interests == "string"){//there's only one item in input and is received as string
				var arr = [];
				arr.push(req.body.interests);
				arr.push(10);
				interests.push(arr);
			}else{
				for(k = 0; k < req.body.interests.length; k++){
					var ints = [];
					ints.push(req.body.interests[k]);
					ints.push(10);
					interests.push(ints);
				}
			}
			user.preferences.interests = interests;
		}else{
			user.preferences.interests = [];
		}
		if(req.body.languages){
			var languages = [];
			if(typeof req.body.languages == "string"){//there's only one item in input and is received as string
				var arr = [];
				arr.push(req.body.languages);
				arr.push(100);
				languages.push(arr);
			}else{
				for(k = 0; k < req.body.languages.length; k++){
					var ints = [];
					ints.push(req.body.languages[k]);
					ints.push(100);
					languages.push(ints);
				}
			}
			user.preferences.languages = languages;
		}else{
			user.preferences.languages = [];
		}
		if(req.body.technologies){
			var technologies = [];
			if(typeof req.body.technologies == "string"){//there's only one item in input and is received as string
				var arr = [];
				arr.push(req.body.technologies);
				arr.push(10);
				technologies.push(arr);
			}else{
				for(k = 0; k < req.body.technologies.length; k++){
					var ints = [];
					ints.push(req.body.technologies[k]);
					ints.push(10);
					technologies.push(ints);
				}
			}
			user.preferences.technologies = technologies;
		}else{
			user.preferences.technologies = [];
		}
		if(req.body.fields){
			var fields = [];
			if(typeof req.body.fields == "string"){//there's only one item in input and is received as string
				var arr = [];
				arr.push(req.body.fields);
				arr.push(10);
				fields.push(arr);
			}else{
				for(k = 0; k < req.body.fields.length; k++){

					var ints = [];
					ints.push(req.body.fields[k]);
					ints.push(10);
					fields.push(ints);
				}
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
		if(file){	//upload pfp to gcloud
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
					console.log('upload to gcloud success!', getPublicUrl(gcsname));
					user.profileimg = getPublicUrl(gcsname);

					user.save((err) => {
						if (err) {
							return next(err);
						}
						res.redirect('/account');
					});
			    });
			  });
		}else{

			user.save((err) => {
				if (err) {
					return next(err);
				}
				res.redirect('/');
			});
		}


		
	});
}

//---------dashboard--------------
/**
 * Gets user based on url query key. If id is equal to req.user, enables settings button
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
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
};

/**
 * Post profile changes to database
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.postProfile = (req, res, next) => {
	console.log(req.body);
	var major = req.body.major;
	var educationLevel = req.body.eduLevel;
	var school = req.body.school;
	var graduationYear = req.body.gradYear;
	var fb = req.body.Facebook;
	var phone = req.body.Phone;
	var insta = req.body.Instagram;
	var git = req.body.Github;
	var linkedin = req.body.Linkedin;
	var website = req.body.Website;
	var fields = req.body.fieldsContent.split(',');
	var languages = req.body.lanContent.split(',');
	var technologies = req.body.techContent.split(',');
	var interests = req.body.interestsContent.split(',');
	var hackathons = req.body.hackathonsContent.split(',');

	//TODO: variable size processing?
	var pLan = [];
	var pTech = [];
	var pInt = [];
	var pHack = [];
	var pField = [];
	for(i = 0; i < languages.length; i += 2){
		var arr = [];
		arr.push(languages[i])
		arr.push(languages[i+1]);
		if(languages[i] === languages[i+2]){
			i += 2;
		}
		if(languages[i] != '' ){
			pLan.push(arr);
		}
	}
	for(i = 0; i < technologies.length; i += 2){
		var arr = [];
		arr.push(technologies[i])
		arr.push(technologies[i+1]);
		if(technologies[i] === technologies[i+2]){
			i += 2;
		}
		if(technologies[i] != ''){
			pTech.push(arr);
		}
	}
	for(i = 0; i < interests.length; i += 2){
		var arr = [];
		arr.push(interests[i])
		arr.push(interests[i+1]);
		if(interests[i] === interests[i+2]){
			i += 2;
		}
		if(interests[i]){
			pInt.push(arr);
		}
	}
	for(i = 0; i < fields.length; i += 2){
		var arr = [];
		arr.push(fields[i])
		arr.push(fields[i+1]);
		if(fields[i] === fields[i+2]){
			i += 2;
		}
		if(fields[i] != ''){
			pField.push(arr);
		}
	}
	for(i = 0; i < hackathons.length; i += 2){
		var arr = [];
		arr.push(hackathons[i])
		arr.push(hackathons[i+1]);
		if(hackathons[i] === hackathons[i+2]){
			i += 2;
		}
		if(hackathons[i] != ''){
			pHack.push(arr);
		}
	}


	User.findById(req.user.id, (err, user) => {
		if (err) {
			return next(err);
		}
		
		user.major = major;
		user.educationLevel = educationLevel;
		user.school = school;
		user.graduationYear = graduationYear;
		user.facebook = fb;
		user.github = git;
		user.linkedin = linkedin;
		user.phone = phone;
		user.instagram = insta;
		user.website = website;
		user.about = req.body.noteText || '';
		
		user.preferences.fields = pField;
		user.preferences.languages = pLan;
		user.preferences.technologies = pTech;
		user.preferences.interests = pInt;
		user.hackathons = pHack;

		const file = req.file;
		console.log(file);
		if(file){	//upload pfp to gcloud
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
					console.log('upload to gcloud success!', getPublicUrl(gcsname));
					user.profileimg = getPublicUrl(gcsname);

					user.save((err) => {
						if (err) {
							return next(err);
						}
						res.redirect('/account');
					});
			    });
			  });
		}else{

			user.save((err) => {
				if (err) {
					return next(err);
				}
				res.redirect('/');
			});
		}

	});
	
};

/**
 * Gets preferences of user and renders it into preference setting page. 
 * Appears when: 
 * Visualizing all users for a hackathon for the first time 
 * OR if user chooses save settings for future visualization:
 * 	shows after 3 months since last time a change is made in preferences
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getPreferences = (req, res) => {
	if(req.user){
		res.render('account/preferences', {
			title: 'Preferences', dashboardUser: req.user
		});
	}else{
		res.render('message', {
			title: '404', pageTitle: 'No login user detected', message: 'Only logged in user may access preferences settings.'
		});
	}
};

/**
 * Updates the preferences of the user
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.postPreferences = (req,res) => {
	console.log("\x1b[1m", req.body);
	var interestScore = req.body.interestScore;
	var languageScore =req.body.languageScore;
	var techScore = req.body.techScore;
	var fieldScore = req.body.fieldsScore;

	var fields = req.body.fieldsContent.split(',');
	var languages = req.body.lanContent.split(',');
	var technologies = req.body.techContent.split(',');
	var interests = req.body.interestsContent.split(',');
	
	//TODO: variable size processing?
	var pLan = [];
	var pTech = [];
	var pInt = [];
	var pField = [];
	if(languages[0] != '' && languages[0] != null != languages[0] != ''){
		for(i = 0; i < languages.length; i += 2){
			var arr = [];
			arr.push(languages[i])
			arr.push(languages[i+1]);
			if(languages[i] === languages[i+2]){
				i += 2;
			}
			pLan.push(arr);
		}
	}
	if(technologies[0] != '' && technologies[0] != null != technologies[0] != ''){
		for(i = 0; i < technologies.length; i += 2){
			var arr = [];
			arr.push(technologies[i])
			arr.push(technologies[i+1]);
			if(technologies[i] === technologies[i+2]){
				i += 2;
			}
			pTech.push(arr);
		}
	}
	if(interests[0] != '' && interests[0] != null != interests[0] != ''){
		for(i = 0; i < interests.length; i += 2){
			var arr = [];
			arr.push(interests[i])
			arr.push(interests[i+1]);
			if(interests[i] === interests[i+2]){
				i += 2;
			}
			pInt.push(arr);
		}
	}
	if(fields[0] != '' && fields[0] != null != fields[0] != ''){
		for(i = 0; i < fields.length; i += 2){
			var arr = [];
			arr.push(fields[i])
			arr.push(fields[i+1]);
			if(fields[i] === fields[i+2]){
				i += 2;
			}
			pField.push(arr);
		}
	}
	
	User.updateOne({'urlId': req.user.urlId}, {$set: {
		'preferences.interests': pInt,
		'preferences.languages' : pLan,
		'preferences.technologies': pTech,
		'preferences.fields': pField,
		'careScores.interests' : interestScore,
		'careScores.technologies': techScore,
		'careScores.fields':fieldScore,
		'careScores.languages':languageScore
	}}, function(err, user){
		if(err) throw err;
		if(req.params.id){
			var urlId = req.params.id;
			res.redirect('/hackathons/'+urlId+'/visual');
		}else{
			res.redirect('/account')
		}
	});
};

/**
 * Gets the dashboard page of logged in user
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getAccount = (req, res) => {
	if(req.user){
		res.render('account/dashboard', {
			title: 'Account Management', dashboardUser: req.user, settingsEnabled: true
		});
	}else{
		res.render('message', {
			title: '404', pageTitle: 'No login user detected', message: 'Only logged in user may access preferences settings.'
		});
	}
};


//-------account-----------
exports.postUpdatePassword = (req, res, next) => {
	req.assert('password', 'Password must be at least 4 characters long').len(4);
	req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/');
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
			res.redirect('/');
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
