var MongoClient = require('mongodb').MongoClient

//var db = new Db('test', new Server('localhost', 27017));
exports.getHackathonList = (req,res, next) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;

  		db.collection('hackathons').find().toArray(function (err, result) {
			if (err) throw err;
			console.log(result);
			res.render('hackathons', {
				title: 'Hackathons', hackathonList: result, css:'hackathons.css', js:'hackathons.js'
			});
		});
		
	  		
	});
};

