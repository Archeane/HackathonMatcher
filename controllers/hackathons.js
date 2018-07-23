var MongoClient = require('mongodb').MongoClient

//var db = new Db('test', new Server('localhost', 27017));
exports.getHackathonList = (req,res, next) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;

  		db.collection('hackathons').find().toArray(function (err, result) {
			if (err) throw err;
			res.render('hackathonslist', {
				title: 'All Hackathons', hackathonList: result, css:'hackathonslist.css', js:'hackathons.js'
			});
		});
	  		
	});
};

exports.getHackathonById = (req, res, next) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if (err) throw err;
  		db.collection('hackathons').findOne({"guid": req.params.id}, (err, result) =>{
  			if(err) throw err;
  			console.log(result);
  			if(result == null){
  				res.send("404 NOT FOUND");
  			}else{
  				res.render('hackathon', {
					title: '', foundHackathon: result, css:'hackathon.css', js:'hackathon.js'
				});
  			}
  			
  		});
	});
};

