const express = require('express')

const router = express.Router()
router.use(express.urlencoded({extended:true}))

const itemCntrl = require('../controllers/item')


//Call API
router.get('/item/add',itemCntrl.item_create_get)
router.post('/item/add',itemCntrl.item_create_post)
router.get('/item/index',itemCntrl.item_index_get)
router.get("/item/edit",itemCntrl.item_edit_get);
router.post("/item/edit",itemCntrl.item_edit_post);
router.delete("/item/delete",itemCntrl.item_delete_get);

//exports:
module.exports=router;