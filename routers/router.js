const router = require('express').Router()

//Mount Routes
router.use('/', require('./index'))
router.use('/auth', require('./auth'))
router.use('/review', require('./review'))
router.use('/user', require('./user'))
router.use('/user', require('./inbox'))
router.use('/item/', require('./item'))
router.use('/payment', require('./payment'))
module.exports = router