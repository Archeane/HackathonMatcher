var spawn = require("child_process").spawn;
var convert = require('mongoose_schema-json');
var MongoClient = require('mongodb').MongoClient

var loggedinUser;
var hackathonData;
var processedData = null;

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



