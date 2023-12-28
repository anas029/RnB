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
        // A user has logged in with OAuth...
        // logger.debug({
        //     googleId: profile.id,
        //     firstName: profile.name.givenName,
        //     lastName: profile.name.familyName,
        //     profileImage: profile.photos[0].value,
        //     emailAddress: profile.emails[0].value,
        // })
        /*  id: '101048612745494424497',
  displayName: 'Ali Naser',
  name: { familyName: 'Naser', givenName: 'Ali' },
  emails: [ { value: 'ali.yaqoob@gmail.com', verified: true } ],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a/ACg8ocK5ALF73wu7cmisTjeRzq84K5BG28VUHlLQqzZQZoGCtgY=s96-c'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "101048612745494424497",\n' +
    '  "name": "Ali Naser",\n' +
    '  "given_name": "Ali",\n' +
    '  "family_name": "Naser",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocK5ALF73wu7cmisTjeRzq84K5BG28VUHlLQqzZQZoGCtgY\\u003ds96-c",\n' +
    '  "email": "ali.yaqoob@gmail.com",\n' +
    '  "email_verified": true,\n' +
    '  "locale": "en"\n' +
    '}',
  _json: {
    sub: '101048612745494424497',
    name: 'Ali Naser',
    given_name: 'Ali',
    family_name: 'Naser',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocK5ALF73wu7cmisTjeRzq84K5BG28VUHlLQqzZQZoGCtgY=s96-c',
    email: 'ali.yaqoob@gmail.com',
    email_verified: true,
    locale: 'en'
  }
}*/
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