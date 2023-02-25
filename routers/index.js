const express = require('express');
const router = express.Router()
const indexCtrl = require('../controllers/index');
const isLoggedIn = require('../lib/isLoggedIn');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//calling APIs

router.get('/', indexCtrl.index_get)
router.get('/home/another', isLoggedIn, indexCtrl.another_get)



module.exports = router