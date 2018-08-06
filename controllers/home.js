/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
//  if (req.user){
//  	res.send('there is a logged user');
//  }else{
  	res.render('home', {
    title: 'Home', 'css': ['home.css']
  });
//  }	
  
};

exports.landing = (req, res) =>{
	res.render('landing', {
		title: 'Home'
	});
};

exports.searchResult = (req, res) => {
	res.render('search', {
		title: 'Results'
	});
};


