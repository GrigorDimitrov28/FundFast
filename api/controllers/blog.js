const models = require('../models')
const utils = require('../utils')

module.exports = {
    getAll: async(req, res, next) => {
        const allBlogs = await models.Blog.find({})
        res.send(allBlogs)
    },
    getFour: async(req, res, next) => {
        const allBlogs = await models.Blog.find({})
        const fourBlogs = allBlogs.splice(0, 4)
        res.send(fourBlogs)
    },
    post: async (req, res, next) => {
        const { name, image, description, author } = req.body
        const nameError = utils.validate.fundraiserName(name)
        const imageError = utils.validate.imageLink(image)
        const descriptionError = utils.validate.fundraiserDescription(description)

        await models.User.findById(author).catch(err => {
            res.send({'notAuth': true})
        })

        if(nameError || imageError || descriptionError) {
            res.send({
                imageError,
                nameError,
                descriptionError
            })
        }else {
            await models.Blog.create({ name, image, description, author }).then(result => res.send({'completed': true})).catch(err => {
                res.send({'serverError': true})
            })
        }
    }
}