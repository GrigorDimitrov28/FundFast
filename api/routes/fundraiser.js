const controllers = require('../controllers')
const router = require('express').Router()

router.post('/create', controllers.fundraiser.post);

module.exports = router;