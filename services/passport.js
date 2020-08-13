const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	// Verify this email and password, call done with the user 
	// if it is the correct email and password
	// otherwise call done with false
	User.findOne({ email: email }, function(err, user){
		if (err){
			return done(err);
		}
		if (!user){
			return done(null, false);
		}

		// compare passwords - is 'password' equal to user.password?
	});
});

// setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	// see if user ID in the paylaod exists in our database
	// if it does call 'done' with that use
	// otherwise, call done without a userobject

	User.findById(payload.sub, function (err, user) {
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);