const express = require('express')
const router = express.Router()
const userCntrl = require('../controllers/user')
const isLoggedIn = require('../lib/isLoggedIn');
const upload = require('../config/cloudinary')

//CALL API:
router.get('/myProfile', userCntrl.user_myProfile_get)
router.get('/edit', userCntrl.user_edit_get)
router.post('/edit', userCntrl.user_edit_post)
router.post('/edit/img', upload.single('profileImage'), userCntrl.user_editImg_post)
router.post('/edit/password', userCntrl.user_updatePassword_post)
router.get('/detail', userCntrl.user_detail_get)
router.get('/list', userCntrl.user_profile_get)

//exports:
module.exports = router;
