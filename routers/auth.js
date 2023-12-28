const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')
const connect = require('connect-ensure-login')
const isLoggedOut = require('../lib/isLoggedOut');
const passport = require('passport');



router.get('/signup', connect.ensureLoggedOut('/'), authCtrl.auth_signup_get)
router.post('/signup', connect.ensureLoggedOut('/'), authCtrl.auth_signup_post)
router.get('/signin', isLoggedOut, authCtrl.auth_signin_get)
router.post('/signin', connect.ensureLoggedOut('/'), authCtrl.auth_signin_post)
router.get('/signout', authCtrl.auth_signout_get)
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
));
// Google OAuth login route
router.get('/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
        // Requesting the user's profile and email
        scope: ['profile', 'email'],
        // Optionally force pick account every time
        // prompt: "select_account"
    }
));



module.exports = router