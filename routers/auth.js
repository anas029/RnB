const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')


router.get('/signup', authCtrl.auth_signup_get)
router.post('/signup', authCtrl.auth_signup_post)
router.get('/signin', authCtrl.auth_signin_get)
router.post('/signin', authCtrl.auth_signin_post)
router.get('/signout', authCtrl.auth_signout_get)



module.exports = router