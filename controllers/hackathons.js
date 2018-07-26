var spawn = require("child_process").spawn;
var convert = require('mongoose_schema-json');
var MongoClient = require('mongodb').MongoClient
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
		/*
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
		*/
/*
		const Hackathon = require('../models/Hackathon');
		for(i = 0; i < 3; i++){
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
			var rand = Math.floor(19+Math.random()*30);
			db.collection('users').aggregate([ { $sample: { size: rand } } ], function(err, d){
				if(err) throw err;
				collection.update({'name': doc.name}, {$set:{'hackers': d}});
				console.log('update');
			});
		});

	});
};


//var db = new Db('test', new Server('localhost', 27017));
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
  		db.collection('hackathons').findOne({"guid": req.params.id}, (err, result) =>{
  			if(err) throw err;

  			if(result == null){
  				res.send("404 NOT FOUND");
  			}else{

  				/*
				/TODO: printing hacker.interests and hacker.languages as Array/
				manager.loadTestHackathonData("CEWIT", function(err, hackathon){
					if(err) throw err;
					if(!hackathon) throw "Hackathon not found";
					hack = hackathon;


					var jsonStr = convert.schema2json(hack);
					//console.log(jsonStr);


					var process = spawn('python',["./algorithmn/process.py",
				                         jsonStr] );
					
					process.stdout.on('data', function(data) {
						console.log(data.toString());
						var arr = eval(data.toString());
						console.log(arr[0][0]);
					});
				});
				*/
			
				var resultBson = result;
				var resultJson = convert.schema2json(result);


				//console.log('about to launch process');
				//console.log('before render', req.user);
				var process = spawn('python', ["./algorithmn/process.py", resultJson, req.user]);
				//console.log('process launched');

				
				process.stdout.on('data', function(data){
					processedData = data.toString();
				});
				process.on('close', function(){
					console.log(processedData);
					res.render('hackathon', {
						title: '', foundHackathon: result, data: processedData, css:'hackathon.css', js:'hackathon.js'
					});
				});
				
  				

  			}
  			
  		});
	});
};

exports.process = (req, res, next) =>{
	//console.log('hackathonData from /processHackathonHackers', hackathonData);
	//res.send('ABCDEFG');
	//res.render('hackathon', {
	//	title: '', css:'hackathon.css', js:'hackathon.js'
	//});
	//
	
	res.write('HELLLOOOOO')
	res.end();
};



