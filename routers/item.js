const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
const isLoggedIn = require('../lib/isLoggedIn');
router.use(express.urlencoded({ extended: true }))
const itemCntrl = require('../controllers/item')
const upload = require('../lib/upload')

//Call API
router.get('/add', isLoggedIn, itemCntrl.item_create_get)
router.post('/add', isLoggedIn, itemCntrl.item_create_post)
router.get('/addimg', isLoggedIn, itemCntrl.item_addImg_get)
router.post('/addimg', isLoggedIn, upload.single('itemImage'), itemCntrl.item_addImg_post)
router.get('/index', itemCntrl.item_index_get)
router.get('/details', itemCntrl.item_details_get)
router.get('/borrow', isLoggedIn, itemCntrl.item_borrow_get)
router.post('/borrow', isLoggedIn, itemCntrl.item_borrow_post)
router.get('/return', isLoggedIn, itemCntrl.item_return_get)
router.post('/return', isLoggedIn, itemCntrl.item_return_post)

//exports:
module.exports = router;
