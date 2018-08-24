//TODO: Add a top hackers page, ranked by num of projects.
var spawn = require("child_process").spawn;
const { fork } = require('child_process');
var convert = require('mongoose_schema-json');
var MongoClient = require('mongodb').MongoClient;
const async = require('async');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

/**
 * Creates test users 
 *  * TO be deleted after deployment
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.testInit = (req,res,next) =>{
	MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
		if (err) throw err;
		this.db = db;

		const User = require('../models/User');
		const random_name = require('node-random-name');
		const randomstring = require('randomstring');
		const Chance = require('chance');
		var chance = new Chance();

		const unis = require('../wtf/assets/us_institutions.json');
		const majors = require('../wtf/assets/majors.json');
		const interests = require('../wtf/assets/interests.json');
		const tech = require('../wtf/assets/technologies.json');
		const lan = require('../wtf/assets/languages.json');
		const fields = require('../wtf/assets/fields.json');
		
		var usersArr = [];
		for(j = 0; j < 150; j++){
			var firstname = random_name({first:true});
			var lastname = random_name({last:true});
			var id = firstname+'.'+lastname;
			var email = firstname.toLowerCase()+'@gmail.com';
			var profileurl = '';
			if(j % 2 == 0){
				profileurl = 'https://randomuser.me/api/portraits/women/'+Math.floor(Math.random()*99)+'.jpg';
			}else{
				profileurl = 'https://randomuser.me/api/portraits/men/'+Math.floor(Math.random()*99)+'.jpg';
			}
			var user = new User({
				firstname: firstname,
				lastname:lastname,
				urlId: id,
				email: email,
				password: '1234',
				emailSecretToken: 'secretToken',
				emailActive: true,
				profileimg: profileurl,
				about: chance.sentence()
			});
			
			user.school = unis[Math.floor(30+Math.random()*50)].institution;
			user.major = majors[Math.floor(Math.random()*majors.length)].major;
			const graduationYear = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
			const edu = ['high school', 'undergraduate', 'graduate', 'PhD'];
			user.graduationYear = graduationYear[Math.floor(Math.random()*graduationYear.length)];
			user.educationLevel = edu[Math.floor(Math.random()*edu.length)];

			var arr = [];
			for(i = 0; i < Math.floor(Math.random()*5); i++){
				var k = interests[Math.floor(Math.random() * interests.length)].name;
				if(arr.includes(k)){
					continue;
				}else{
					arr.push([k, Math.floor(Math.random()*10)]);
				}
			}
			user.preferences.interests = arr;
			user.careScores.interests = Math.floor(Math.random()*10);
			arr = [];
			for(m = 0; m < Math.floor(Math.random()*5); m++){
				var k = tech[Math.floor(Math.random() * tech.length)].name;
				if(arr.includes(k)){
					continue;
				}else{
					arr.push([k, Math.floor(Math.random()*10)]);
				}
			}
			user.preferences.technologies = arr;
			user.careScores.technologies = Math.floor(Math.random()*10);
			arr = [];
			for(n = 0; n < Math.floor(Math.random()*5); n++){
				var k = lan[Math.floor(Math.random() * lan.length)].name;
				if(arr.includes(k)){
					continue;
				}else{
					arr.push([k, Math.floor(Math.random()*100)]);
				}
			}
			user.preferences.languages = arr;
			user.careScores.languages = Math.floor(Math.random()*10);
			arr = [];
			for(o = 0; o < Math.floor(Math.random()*5); o++){
				var k = fields[Math.floor(Math.random() * fields.length)].name;
				if(arr.includes(k)){
					continue;
				}else{
					arr.push([k, Math.floor(Math.random()*10)]);
				}
			}
			user.preferences.fields = arr;
			user.careScores.fields = Math.floor(Math.random()*10);

			user.isNew = true;
			usersArr.push(user);
		}
		try{
			console.log('userArr', usersArr.length);
			db.collection('users').insertMany(usersArr, {ordered:false});
		}catch(e){
			console.log('Error!', e);
		}		

	});
};

exports.addTestHackathons = (req, res, next) => {
	MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
		this.db = db;

		const User = require('../models/User');
		const random_name = require('node-random-name');
		const randomstring = require('randomstring');
		const Chance = require('chance');
		var chance = new Chance();

		const unis = require('../wtf/assets/us_institutions.json');
		const majors = require('../wtf/assets/majors.json');
		const interests = require('../wtf/assets/interests.json');
		const tech = require('../wtf/assets/technologies.json');
		const lan = require('../wtf/assets/languages.json');
		const fields = require('../wtf/assets/fields.json');
		const Hackathon = require('../models/Hackathon');
		for(i = 0; i < 3; i++){
			var uni = unis[Math.floor(100+Math.random()*50)].institution
			var name = 'hack'+uni;
			var email = chance.email();
			var phone = chance.phone();
			var state = chance.state({ country: 'us' });
			var city = chance.city();
			var url = chance.url();
			var imageurl = 'https://picsum.photos/300/300/?'+Math.floor(10+Math.random()*500);

			var hackathon = new Hackathon({
					name: name,
					urlId: name.split(' ').join('.').toLowerCase(),
					university: uni,
					email: email,
					phone: phone,
					state: state,
					city: city,
					street: chance.street({country:'us'}),
					date: chance.date({year: 2018}),
					about: chance.paragraph(),
					imageurl: imageurl
				});
			hackathon.isNew = true;
			try{
				db.collection('hackathons').insertOne(hackathon, function(){
					console.log("\x1b[36m","hackathon save success!");
				});
			}catch(e){
				console.log('Error!', e);
			}
		}


		var collection = db.collection('hackathons');
		collection.find().forEach(function(doc) {
			var rand = Math.floor(40+Math.random()*30);
			db.collection('users').aggregate([ { $sample: { size: rand } } ], function(err, data){
				if(err) throw err;
				var emails = [];
				data.forEach(function(d){
					emails.push(d.email);
				});
				collection.update({'name': doc.name}, {$set:{'hackers': emails}});
			});
		});
	});
}

/**
 * Gets the page containing all upcoming hackathons
 * TODO: Only post hackathons that are upcoming. Put past hackathons in another db
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getHackathonList = (req,res, next) => {
	MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
		if (err) throw err;

  		db.collection('hackathons').find().toArray(function (err, result) {
			if (err) throw err;
			res.render('hackathonslist', {
				title: 'All Hackathons', hackathonList: result 
			});
			loggedinUser = req.user;
		});
	  		
	});
};


/**
 * Retrieves hackathon with same urlId as req.params
 * Processes users attending the hackathon
 * TODO
 * 2. integrated getMinifiedUsers() function
 * 3. link to db logo, link to devpost
 * 4. integrate top hackers
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getHackathonById = (req, res, next) => {
	MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
		if (err) throw err;
  		db.collection('hackathons').findOne({"urlId": req.params.id}, (err, result) =>{
  			if(err) throw err;
  			if(result == null){	//If hackathon is not found
  				res.send("404 NOT FOUND");
  			}else if(!(req.user.preferences != null && req.user.preferences != undefined && req.user.preferences != '') ||
  					!((req.user.preferences.interests != null && req.user.preferences.interests != undefined && req.user.preferences.interests != '') &&  
  					 (req.user.preferences.languages != null && req.user.preferences.languages != undefined && req.user.preferences.languages != '') &&
  					 (req.user.preferences.fields != null && req.user.preferences.fields != undefined && req.user.preferences.fields != '') &&
  					 (req.user.preferences.technologies != null && req.user.preferences.technologies != undefined && req.user.preferences.technologies != ''))){
  				console.log('preferences null');
  				res.render('hackathon', {
					title: '', foundHackathon: result, containsHackers: false, data: false
				});
 
  			}else{	//If hackathon is found and user preferences is not empty.
				var resultBson = result;
				//var resultJson = JSON.parse(convert.schema2json(result)); //json format of all hackers attneding the hackathon
				var resultJson = JSON.parse(convert.schema2json(result));
				
				var allHackathonHackers = resultJson['hackers'];
				/* separate hackaton hackers in to chunks of data to be sent
				var iterator = allHackathonHackers.entries();
				var hundredHackers = [];
				var tempArr = [];
				for (let e of iterator) {
					if(e[0] % 10 == 0 && e[0] != 0){
						hundredHackers.push(tempArr);
						tempArr = [];
					}
					tempArr.push(e[1]);
				}
				*/
				//console.log(user['preferences']);
				var process = spawn('python', ["./algorithmn/process.py", allHackathonHackers, JSON.stringify(req.user)]);
			
				process.stdout.on('data', function(data){
					processedData = data.toString();
					//console.log(processedData);
				});

				process.stdout.on('end', function(){
					var arr = eval("["+processedData+"]")[0];
					if(arr != null && arr.length > 0 && arr != undefined && arr != '' && arr != []){

						var hackathonMatches = [result['urlId']];
						hackathonMatches.push(arr);
						//TODO: instead of pushing, update existing hackathon matches if already exist in user matches
						db.collection("users").update({"urlId":req.user.urlId},
							{
								$set: {
									"matches":hackathonMatches
								}
							}
						);
						//console.log(arr);
						var topten = arr.slice(1,11);
						console.log(topten);
						var toptenHackers = [];
						var counter = 0;
						new Promise(async (resolve, reject) => {
							for(let item of topten){
								let result = await db.collection('users').findOne({'urlId':item[0]});
								toptenHackers.push(result);
							}
							resolve(toptenHackers);
						}).then((tempdata) =>{
							res.render('hackathon', {
								title: '', foundHackathon: result, containsHackers: true, data: tempdata
							});
						});
					}else{//no matchings users are found
						console.log('no matchings users are found')
						res.render('hackathon', {
							title: '', foundHackathon: result, containsHackers: false, data: false
						});
					}

				});

  			}
  			
  		});
	});
};

/*
	@param: list of complete data users to be minified
	@returns: list of minified users
 */
function getMinifiedUsers(){

}

/**
 * Displays the visualization of matching hackers. 
 * TODO: Show most relevant hackers (based on # of hackathons) if no matching result. 
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.visual = (req, res, next) =>{
	console.log('loading visual');
	MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
		if (err) throw err;

		var user = JSON.stringify(req.user);
		var parsedUser = JSON.parse(user);
		var hackathonUrlId = req.params.id;
		var matchedHackathon = parsedUser.matches[0];
		
		console.log(matchedHackathon);
		//TODO: change this if urlID format is changed
		//if user already containes matched hackers for params hackathon
		if(matchedHackathon === hackathonUrlId && parsedUser.matches[1] != null && parsedUser.matches[1] != undefined){
			var matches = parsedUser.matches[1];	//Gets all the users of hackatonUrlId
			var minUsers = [];
			new Promise(async(resolve, reject) => {
				for(let hacker of matches){
					let data = await db.collection('users').findOne({'urlId':hacker[0]});
					var user = JSON.stringify({
						"_id":data._id,
						"urlId": data.urlId,
						"email":data.email,
						"hackathons":data.hackathons,
						"name": data.firstname+" "+data.lastname,
						"profileurl": data.profileimg,
						"school":data.school,
						"major":data.major,
						"graduationYear":data.graduationYear,
						"educationLevel":data.educationLevel,
						"score": hacker[1]
					});
					console.log(user);
					minUsers.push(user);
				}
				console.log(matches.length);
				console.log(minUsers.length);
				resolve(minUsers);/*
				await matches.forEach(function(hacker){
					db.collection('users').findOne({"urlId":hacker[0]}, function(err, data){
						var user = JSON.stringify({
							"_id":data._id,
							"urlId": data.urlId,
							"email":data.email,
							"hackathons":data.hackathons,
							"name": data.firstname+" "+data.lastname,
							"profileurl": data.profileimg,
							"school":data.school,
							"major":data.major,
							"graduationYear":data.graduationYear,
							"educationLevel":data.educationLevel,
							"score": hacker[1]
						});
						minUsers.push(user);
						if(minUsers.length == matches.length){
							
						}
					});//end of db.findOne
				});//end fo foreach
				resolve(minUsers);*/
			}).then(function(result){
				res.render('visualization', {
					title:'Visualization', matches: result, css:"visualization.css", js:"visualization.js"
				});
			}, function(err){
				throw err;
			});
		}else{	//do processing first
			db.collection('hackathons').findOne({"urlId": req.params.id}, (err, result) =>{
	  			if(err) throw err;

	  			if(result == null){
	  				res.send("404 NOT FOUND");
	  			}else{
					var resultJson = JSON.parse(convert.schema2json(result));
					var allHackathonHackers = resultJson['hackers'];
					

					var process = spawn('python', ["./algorithmn/process.py", allHackathonHackers, JSON.stringify(req.user)]);
					
					process.stdout.on('data', function(data){
						console.log('data:');
						console.log(data);
						processedData = data.toString();
						console.log(processedData);
					});
					
					process.stdout.on('end', function(){
						if(processedData != undefined && processedData != null && processedData.length != 0){
							var arr = eval("["+processedData+"]")[0];
							if(arr != null && arr.length > 0 && arr != undefined && arr != '' && arr != []){
								var hackathonMatches = [hackathonUrlId];
								hackathonMatches.push(arr);
								//TODO: instead of pushing, update existing hackathon matches if already exist in user matches
								db.collection("users").update({"urlId":req.user.urlId},
									{
										$set: {
											"matches":hackathonMatches
										}
									},
								() => {
									new Promise(async (resolve, reject) => {
										for(let hacker of matches){
											let data = await db.collection('users').findOne({'urlId':hacker[0]});
											var user = JSON.stringify({
												"_id":data._id,
												"urlId": data.urlId,
												"email":data.email,
												"hackathons":data.hackathons,
												"name": data.firstname+" "+data.lastname,
												"profileurl": data.profileimg,
												"school":data.school,
												"major":data.major,
												"graduationYear":data.graduationYear,
												"educationLevel":data.educationLevel,
												"score": hacker[1]
											});
											console.log(user);
											minUsers.push(user);
										}
										console.log(matches.length);
										console.log(minUsers.length);
										resolve(minUsers);/*
										var minUsers = [];
										await arr.forEach(function(hacker){
											db.collection('users').findOne({"urlId":hacker[0]}, function(err, data){
												var user = JSON.stringify({
													"_id":data._id,
													"urlId": data.urlId,
													"email":data.email,
													"hackathons":data.hackathons,
													"name": data.firstname+" "+data.lastname,
													"profileurl": data.profileimg,
													"school":data.school,
													"major":data.major,
													"graduationYear":data.graduationYear,
													"educationLevel":data.educationLevel,
													"score": hacker[1]
												});
												minUsers.push(user);
												
												
											});
										});//end of foreach
										resolve(minUsers);*/
									}).then(function(result){
										res.render('visualization', {
											title:'Visualization', matches: result, css:"visualization.css", js:"visualization.js"
										});
									}, function(err){
										throw err;
									});
								});
							}else{
								res.render('message',{
									title:'unmatched preferences', 
									pageTitle:'No users with similiar preferences found', 
									message:'Please add a preference.',
									redirectURL: '/hackathons'
								});
							}
						}else{	//process data contains nothing
							res.render('message',{
								title:'unmatched preferences', 
								pageTitle:'No users with similiar preferences found', 
								message:'Please add a preference.',
								redirectURL: '/hackathons'
							});
						}
					}); //end of process data end
				}
			});
		}

	});
};

