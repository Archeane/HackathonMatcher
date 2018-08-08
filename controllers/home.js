



/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
//  if (req.user){
//  	res.send('there is a logged user');
//  }else{
  	res.render('landing', {
    title: ''
  });
//  }	
  
};

exports.getHome = (req, res) =>{
	res.render('landing', {
		title: 'Home'
	});
};

/*
	receieve the post search request from client
	Searches the database based on params in URL
	Sends the results as request
	@keyword, required
		returns the keyword to search
	@type=user
		Searches the user database based on keyword 
	@type=hackathon
		Searches the hackathons database based on keyword
	@searchtype=home, required
		Sends results as http request to navbar
	@searchtype=result, required
		Renders searchResults page
 */
exports.postSearch = (req, res, next) => {
	console.log('in post search');
	var MongoClient = require('mongodb').MongoClient;
	console.log(req.query);
	var keyword = req.query.keyword;
	var searchType = req.query.searchtype;
	
	if(keyword === undefined || searchType === undefined){
		//TODO: handle error thrown
		throw new URIError("URI has invalid paramaters keyword or searchtype");
	}
	if(req.query.type){
		type = req.query.type;
		if(type === 'users'){
			MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
				var results = [];
				var userPromise = new Promise((resolve, reject) => {
					db.collection('users').find({ "name": { $regex: keyword, $options:"i m"}}).toArray(function(err, docs){
						if(err) throw err;
						results.push(docs);
						resolve(results);
					});
				});
				userPromise.then((results) => {
					console.log(results);
					if(searchType === "home"){
						console.log("\x1b[32m", 'sending to res');
						res.write(JSON.stringify(results));
						res.end();
					}else if(searchType === "result"){
						console.log("\x1b[32m", 'rendering search result');
						res.render('search',{
							title: 'Results', searchResults : JSON.stringify(results)
						});
					}else{
						throw new URIError("invalid paramter searchtype");
					}
				});
				//TODO: handle promise rejections
			});
		}else if(type === 'hackathons'){
			MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
				var results = [];
				console.log('keyword', keyword);
				var userPromise = new Promise((resolve, reject) => {
					db.collection('hackathons').find({ "name": { $regex: keyword, $options:"i m"}}).toArray(function(err, docs){
						if(err) throw err;
						results.push(docs);
						resolve(results);
					});
				});
				userPromise.then((results) => {
					console.log(results);
					if(searchType === "home"){
						res.write(JSON.stringify(results));
						res.end();
					}else if(searchType === "result"){
						res.render('search',{
							title: 'Results', searchResults: JSON.stringify(results)
						});
					}else{
						throw new URIError("invalid paramter searchtype");
					}
				});

			});
		}else{
			throw new URIError("invalid parameter type");
		}
	}else{
		MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
			var results = [];
			var userPromise = new Promise((resolve, reject) => {
				db.collection('users').find({ "name": { $regex: keyword, $options:"i m"}}).toArray(function(err, docs){
					if(err) throw err;
					results.push(docs);
					resolve();
				});
			});
			var hackathonPromise = new Promise((resolve, reject) => {
				db.collection('hackathons').find({ "name": { $regex: keyword, $options:"i m"}}).toArray(function(err, docs){
					if(err) throw err;
					results.push(docs);
					resolve();
				});
			});

			Promise.all([userPromise, hackathonPromise]).then((err) =>{
				console.log(results);
				if(searchType === "home"){
					res.write(JSON.stringify(results));
					res.end();
				}else if(searchType === "result"){
					res.render('search',{
						title: 'Results', searchResults : JSON.stringify(results)
					});
				}else{
					throw new URIError("invalid paramter searchtype");
				}

			});
		});
	}
}


/*
	NOTE: TEST ROUTE
 */
exports.getSearch = (req, res) => {
	console.log('in getsearch');
	var MongoClient = require('mongodb').MongoClient;
	console.log(req.query);
	var keyword = req.query.keyword;
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		if(err) throw err;
		db.collection('users').find({ "name": { $regex: keyword, $options:"i m"}}).toArray(function(err, docs){
			if(err) throw err;
			console.log('\x1b[36m%s\x1b[0m', 'users found!!!');
			res.render('search',{
				title: 'Results', searchResults : JSON.stringify(docs)
			});
		});
	});
};



