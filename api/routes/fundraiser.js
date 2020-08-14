const controllers = require('../controllers')
const router = require('express').Router()

router.post('/featured', controllers.fundraiser.getByCategory)
router.post('/getFundraiser', controllers.fundraiser.getById)
router.post('/getMy', controllers.fundraiser.getMy)
router.post('/create', controllers.fundraiser.post)
router.post('/delete', controllers.fundraiser.delete)
router.put('/edit', controllers.fundraiser.edit)
router.put('/donate', controllers.fundraiser.donate)


module.exports = router;