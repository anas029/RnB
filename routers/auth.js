const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')
const connect = require('connect-ensure-login')
const isLoggedOut = require('../lib/isLoggedOut');




router.get('/signup', connect.ensureLoggedOut('/'), authCtrl.auth_signup_get)
router.post('/signup', connect.ensureLoggedOut('/'), authCtrl.auth_signup_post)
router.get('/signin', isLoggedOut, authCtrl.auth_signin_get)
router.post('/signin', connect.ensureLoggedOut('/'), authCtrl.auth_signin_post)
router.get('/signout', authCtrl.auth_signout_get)



module.exports = router