const controllers = require('../controllers')
const router = require('express').Router()

router.get('/statistics', controllers.website.getStats)

module.exports = router;