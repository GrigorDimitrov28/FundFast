const controllers = require('../controllers')
const router = require('express').Router()

router.post('/featured', controllers.fundraiser.get)
router.post('/create', controllers.fundraiser.post)

module.exports = router;