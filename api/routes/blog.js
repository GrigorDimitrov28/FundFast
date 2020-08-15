const controllers = require('../controllers')
const router = require('express').Router()

router.post('/delete', controllers.blog.delete)
router.post('/create', controllers.blog.post)
router.post('/getMy', controllers.blog.getMy)
router.post('/getOne', controllers.blog.getOne)
router.post('/comment', controllers.blog.comment)
router.put('/edit', controllers.blog.edit)
router.get('/getFour', controllers.blog.getFour)
router.get('/getAll', controllers.blog.getAll)

module.exports = router;