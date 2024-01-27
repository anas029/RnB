const passport = require('passport')
const User = require('../models/User');
const logger = require('../lib/logger');

const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// This saves the ID in the session
passport.serializeUser(function (user, done) {
    done(null, user.id)
})

// Retrieves the user from the database according to the ID from the session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

passport.use(new LocalStrategy({
    usernameField: 'emailAddress',
    passwordField: 'password'
},
    function (emailAddress, password, done) {
        User.verify(emailAddress, password)
            .then((user) => { return done(null, user) })
            .catch(e => {
                console.log(e);
                return done(null, false, { message: e.message })
            })
    }
))
passport.use(new GoogleStrategy(
    // Configuration object
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function
    async function (accessToken, refreshToken, profile, done) {

        try {
            // Check if the user is already in your database based on profile.id or any other identifier
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // Create a new user in your database if not found
                user = await User.create({
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    profileImage: profile.photos[0].value,
                    googleEmailAddress: profile.emails[0].value,
                });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport