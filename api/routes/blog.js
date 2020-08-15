const controllers = require('../controllers')
const router = require('express').Router()

router.post('/create', controllers.blog.post)
router.get('/getFour', controllers.blog.getFour)
router.get('/getAll', controllers.blog.getAll)
module.exports = router;