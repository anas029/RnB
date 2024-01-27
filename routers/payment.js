const router = require('express').Router()
const isLoggedIn = require('../lib/isLoggedIn');
const paymentCntrl = require('../controllers/payment')


router.get('/', isLoggedIn, paymentCntrl.payment_index_get)
router.post('/', isLoggedIn, paymentCntrl.payment_index_post)



module.exports = router