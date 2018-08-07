var spawn = require("child_process").spawn;
var convert = require('mongoose_schema-json');
var MongoClient = require('mongodb').MongoClient;
const async = require('async');

var loggedinUser;
var hackathonData;
var processedData = null;

var x = 0;
var asyncLoop = function(arr) {
    asyncFunction(arr[x],function(){
        x++;
        if(x < arr.length) {
            loopArray(arr);   
        }
    }); 
}

function asyncFunction(msg,callback) {
   	//code for async function
    callback();
}

exports.search = (req, res, next) =>{
	console.log(req.query.key);
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		db.collection('users').find({ "name": { $regex: req.query.key, $options:"i m"}}).toArray(function(err, docs){
			if(err) throw err;
			console.log(docs);
			res.end(JSON.stringify(docs));
		});
		/*
		db.collection('users').find({ "$or": [
		    { "name": { "$regex": "/^"+req.query.key+"$/i", "$options" : "m"} }, 
		    { "email": { "$regex": "/^"+req.query.key+"$/i", "$options" : "m"}}
		]}, function(err, data){
			if(err) throw err;
			console.log(data);
			return data;
		});*/
	});

};






exports.testInit = (req,res,next) =>{
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
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
		for(j = 0; j < 500; j++){
			var firstname = random_name({first:true});
			var lastname = random_name({last:true});
			var id = randomstring.generate();
			var index = j;
			var email = firstname.toLowerCase()+'@gmail.com';
			var user = new User({
				name: firstname+' ' +lastname,
				id: id,
				index: index,
				email: email,
				password: '1234',
				emailSecretToken: 'secretToken',
				emailActive: true,
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
					arr.push([k, Math.floor(Math.random()*10)]);
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
		
/*
		const Hackathon = require('../models/Hackathon');
		for(i = 0; i < 9; i++){
			var uni = unis[Math.floor(30+Math.random()*50)].institution
			var name = 'hack'+uni;
			var email = chance.email();
			var phone = chance.phone();
			var state = chance.state({ country: 'us' });
			var city = chance.city();
			var url = chance.url();

			var hackathon = new Hackathon({
					name: name,
					guid: chance.guid(),
					university: uni,
					email: email,
					phone: phone,
					state: state,
					city: city,
					street: chance.street({country:'us'}),
					date: chance.date({year: 2018}),
					about: chance.paragraph()
				});
			hackathon.isNew = true;
			try{
				console.log(hackathon);
				db.collection('hackathons').insertOne(hackathon, function(){
					console.log("\x1b[36m","hackathon save success!");
				});
			}catch(e){
				console.log('Error!', e);
			}
		}
*/

		var collection = db.collection('hackathons');
		collection.find().forEach(function(doc) {
			var rand = Math.floor(100+Math.random()*200);
			db.collection('users').aggregate([ { $sample: { size: rand } } ], function(err, data){
				if(err) throw err;
				var emails = [];
				data.forEach(function(d){
					emails.push(d.email);
				});
				//console.log(emails);
				collection.update({'name': doc.name}, {$set:{'hackers': emails}});
				console.log('update');
			});
		});

	});
};

exports.getHackathonList = (req,res, next) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;

  		db.collection('hackathons').find().toArray(function (err, result) {
			if (err) throw err;
			res.render('hackathonslist', {
				title: 'All Hackathons', hackathonList: result, css:'hackathonslist.css', js:'hackathons.js'
			});
			loggedinUser = req.user;
		});
	  		
	});
};

exports.getHackathonById = (req, res, next) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;
		//console.log(req.params.id);
  		db.collection('hackathons').findOne({"email": req.params.id}, (err, result) =>{
  			if(err) throw err;

  			if(result == null){
  				res.send("404 NOT FOUND");
  			}else{
				var resultBson = result;
				var resultJson = convert.schema2json(result);
				
				//If user matches is empty
				//TODO: replace test user with logged in user
				var user = JSON.stringify({
					"_id":"5b5a01fce094f20594668460",
				    "preferences" : {
				        "interests" : [ 
				            [ 
				                "Computer Vision", 
				                1
				            ], 
				            [ 
				                "Graphics", 
				                6
				            ]
				        ],
				        "languages" : [ 
				            [ 
				                "mysql", 
				                2
				            ], 
				            [ 
				                "C++", 
				                5
				            ],
				            [
				            	"PHP",
				            	3
				            ]
				        ],
				        "fields" : [ 
				            [ 
				                "Scinece", 
				                9
				            ], 
				            [ 
				                "Finance", 
				                7
				            ]
				        ],
				        "technologies" : [ 
				            [ 
				                "React Native", 
				                7
				            ], 
				            [ 
				                "Firebase", 
				                4
				            ], 
				            [ 
				                "Ruby-on-rails", 
				                3
				            ]
				        ],
				        "hobbies" : []
				    },
				    "careScores" : {
				        "interests" : 3,
				        "technologies" : 1,
				        "languages" : 9,
				        "fields" : 8
				    },
				    "tokens" : [],
				    "hackathons" : [],
				    "name" : "Eva Desak",
				    "id" : "340JYLom9QrSHed96jRUxKGI941BuGai",
				    "index" : 1,
				    "email" : "eva@gmail.com",
				    "password" : "1234",
				    "emailSecretToken" : "secretToken",
				    "emailActive" : true,
				    "school" : "AVTEC-Alaska's Institute of Technology",
				    "major" : "Accounting",
				    "graduationYear" : "2022",
				    "educationLevel" : "graduate"
				});

				db.collection('users').findOne({"email": "eva@gmail.com"}, function(err, data){
					if(data.matches.length == 0){
						var process = spawn('python', ["./algorithmn/process.py", resultJson, user]);
						process.stdout.on('data', function(data){
							processedData = data.toString();
						});

						process.stdout.on('end', function(){
							var arr = eval("["+processedData+"]")[0];
							db.collection("users").update({"email":"eva@gmail.com"},
								{
									$set: {
										"matches":arr
									}
								}
							);
							var topten = arr.slice(0,10);
							console.log(topten);
							res.render('hackathon', {
								title: '', foundHackathon: result, data: topten, css:'hackathon.css', js:'hackathon.js'
							});
							
						});
					}else{
						var matches = data.matches;
						var topten = matches.slice(0,10);
						res.render('hackathon', {
							title: '', foundHackathon: result, data: topten, css:'hackathon.css', js:'hackathon.js'
						});
					}
				});

  			}
  			
  		});
	});
};

exports.visual = (req, res, next) =>{
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;

		//TODO: replace with logged in user info
		var user = JSON.stringify({
						"_id":"5b5a01fce094f20594668460",
					    "preferences" : {
					        "interests" : [ 
					            [ 
					                "Computer Vision", 
					                1
					            ], 
					            [ 
					                "Graphics", 
					                6
					            ]
					        ],
					        "languages" : [ 
					            [ 
					                "mysql", 
					                2
					            ], 
					            [ 
					                "C++", 
					                5
					            ],
					            [
					            	"PHP",
					            	3
					            ]
					        ],
					        "fields" : [ 
					            [ 
					                "Scinece", 
					                9
					            ], 
					            [ 
					                "Finance", 
					                7
					            ]
					        ],
					        "technologies" : [ 
					            [ 
					                "React Native", 
					                7
					            ], 
					            [ 
					                "Firebase", 
					                4
					            ], 
					            [ 
					                "Ruby-on-rails", 
					                3
					            ]
					        ],
					        "hobbies" : []
					    },
					    "careScores" : {
					        "interests" : 3,
					        "technologies" : 1,
					        "languages" : 9,
					        "fields" : 8
					    },
					    "tokens" : [],
					    "hackathons" : [],
					    "name" : "Eva Desak",
					    "id" : "340JYLom9QrSHed96jRUxKGI941BuGai",
					    "index" : 1,
					    "email" : "eva@gmail.com",
					    "password" : "1234",
					    "emailSecretToken" : "secretToken",
					    "emailActive" : true,
					    "school" : "AVTEC-Alaska's Institute of Technology",
					    "major" : "Accounting",
					    "graduationYear" : "2022",
					    "educationLevel" : "graduate"
					});

		db.collection('users').findOne({"email": "eva@gmail.com"}, function(err, data){
			if(data.matches.length == 0){
				var process = spawn('python', ["./algorithmn/process.py", resultJson, user]);
				process.stdout.on('data', function(data){
					processedData = data.toString();
				});

				process.stdout.on('end', function(){
					var arr = eval("["+processedData+"]")[0];
					db.collection("users").update({"email":"eva@gmail.com"},
						{
							$set: {
								"matches":arr
							}
						}
					);

					var minUsers = [];
					arr.forEach(function(hacker){
						db.collection('users').findOne({"email":arr[0]}, function(err, data){
							var user = JSON.stringify({
								"_id":data._id,
								"email":data.email,
								"hackathons":data.hackathons,
								"name": data.name,
								"school":data.school,
								"major":data.major,
								"graduationYear":data.graduationYear,
								"educationLevel":data.educationLevel,
								"score": arr[1]
							});
							minUsers.push(user);
							if(minUsers.length == matches.length){
								resolve(minUsers);
							}
						});
					}).then(function(result){
						res.render('visualization', {
							title:'Visualization', matches: result, css:"visualization.css", js:"visualization.js"
						});
					}, function(err){
						throw err;
					});
				});
			}else{
				var matches = data.matches;
				var minUsers = [];
				new Promise(function(resolve, reject){
					matches.forEach(function(hacker){
						db.collection('users').findOne({"email":hacker[0]}, function(err, data){
							var user = JSON.stringify({
								"_id":data._id,
								"email":data.email,
								"hackathons":data.hackathons,
								"name": data.name,
								"school":data.school,
								"major":data.major,
								"graduationYear":data.graduationYear,
								"educationLevel":data.educationLevel,
								"score":hacker[1]
							});
							minUsers.push(user);
							if(minUsers.length == matches.length){
								resolve(minUsers);
							}
						});
					});
				}).then(function(result){
					res.render('visualization', {
						title:'Visualization', matches: result, css:"visualization.css", js:"visualization.js"
					});
				}, function(err){
					throw err;
				});
			}
		});

	});

	
};

exports.updateVisual = (req,res,next) => {
	console.log(req.body);
	res.write('received');
	res.end();
};



