var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    UserModel = mongoose.model('User');

passport.use(new LocalStrategy(localStrategy));

function localStrategy(username, password, done) {

    UserModel.findOne({
        username: username
    }, function getUserByName(err, user) {

        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username.'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }
        return done(null, user);
    });
}
