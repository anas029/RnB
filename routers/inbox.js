const express = require('express')
const router = express.Router()
const inboxCntrl = require('../controllers/inbox')
const isLoggedIn = require('../lib/isLoggedIn');

//CALL API:
router.get('/myinbox', isLoggedIn, inboxCntrl.user_inbox_get)
router.get('/message', isLoggedIn, inboxCntrl.user_message_get)
router.post('/myinbox', isLoggedIn, inboxCntrl.user_inbox_post)

//exports:
module.exports = router;