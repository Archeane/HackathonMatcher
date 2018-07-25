const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	gender: String,
	email: {
		type: String,
		unique: true
	},
	password: String,

	emailSecretToken: String,
	emailActive: Boolean,
	passwordResetToken: String,
	passwordResetExpires: Date,

	facebook: String,
	phone: String,
	google: String,
	github: String,
	instagram: String,
	linkedin: String,
	tokens: Array,
	
	
	school: String,
	major: String,
	graduationYear: String,
	educationLevel: String,
	location: String,
	website: String,
	profileimg: 
      { data: Buffer, contentType: String },		

	numOfHackathons: Number,
	hackathons: Array,

	preferences: {
		interests: Array,
		languages: Array,
		fields: Array,
		technologies: Array,
		hobbies: Array
	},
	careScores: {
		interests: Number,
		languages: Number,
		fields: Number,
		technologies: Number,
		hobbies: Number
	}
}, {
	timestamps: true
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
	if (!size) {
		size = 200;
	}
	if (!this.email) {
		return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	}
	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;