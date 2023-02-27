const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))

const itemCntrl = require('../controllers/item')


//Call API
router.get('/item/add',itemCntrl.item_create_get)
router.post('/item/add',itemCntrl.item_create_post)
router.get('/item/index',itemCntrl.item_index_get)

//exports:
module.exports = router;