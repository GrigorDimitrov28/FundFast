const controllers = require('../controllers')
const router = require('express').Router()

router.post('/featured', controllers.fundraiser.getByCategory)
router.post('/getFundraiser', controllers.fundraiser.getById)
router.put('/donate', controllers.fundraiser.donate)
router.post('/create', controllers.fundraiser.post)

module.exports = router;