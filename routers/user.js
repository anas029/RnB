const express = require('express')
const router = express.Router()
const userCntrl = require('../controllers/user')



//CALL API:
router.get('/user/list',userCntrl.user_profile_get)
router.get('/user/detail',userCntrl.user_detail_get)
router.get('/user/myProfile',userCntrl.user_currentDetail_get)
router.get("/user/edit",userCntrl.user_edit_get);
router.post("/user/edit",userCntrl.user_edit_post);
// router.get('/user/profile/:id',userCntrl.user_profile_get)



//exports:
module.exports=router;
