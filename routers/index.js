const express = require('express');
const router = express.Router()
const indexCtrl = require('../controllers/index');
const isLoggedIn = require('../lib/isLoggedIn');
// const { ensureLoggedIn } = require('connect-ensure-login')
const connect = require('connect-ensure-login')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//calling APIs

router.get('/', indexCtrl.index_get)
router.get('/home/another', connect.ensureLoggedIn('/auth/signin'), indexCtrl.another_get)



module.exports = router