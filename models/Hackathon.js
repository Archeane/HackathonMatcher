const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
	images:{
		hero: String,
		logo: String
	},
	url: String,
	name: String,
	university: String,
	email: String,
	phone: String,
	state: String,
	city: String,
	date: Date,
	address: String,
	about: String,
	hackers: Array,
	sponsors: Array
	
}, {
	timestamps: true
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;