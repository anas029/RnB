const { Router } = require('express');
const router = Router()
const indexCtrl = require('../controllers/index')



//calling APIs

router.get('/', indexCtrl.index_get)



module.exports = router