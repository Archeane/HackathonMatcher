var MongoClient = require('mongodb').MongoClient

//var db = new Db('test', new Server('localhost', 27017));
exports.getHackathonList = (req,res, next) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;

  		db.collection('hackathons').find().toArray(function (err, result) {
			if (err) throw err;
			console.log(result);
			res.render('hackathonslist', {
				title: 'All Hackathons', hackathonList: result, css:'hackathons.css', js:'hackathons.js'
			});
		});
	  		
	});
};

exports.getHackathonById = (req, res, next) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;
		console.log(req.params.id);
  		db.collection('hackathons').findOne({"guid": req.params.id}, (err, hackathon) =>{
  			if(err) throw err;
  			res.send(hackathon);
  		});
	});
};

