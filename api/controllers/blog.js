const models = require('../models')
const utils = require('../utils')

module.exports = {
    comment: async (req, res, next) => {
        const { author, content, bId } = req.body
        await models.Blog.findByIdAndUpdate(bId, {$push: {'comments': {author, content}}})
        const comm = await models.Blog.findById(bId)
        const comments = comm.comments
        res.send(comments)
    },
    getOne: async (req, res, next) => {
        const { bId } = req.body
        const blog = await models.Blog.findById(bId).catch(err => console.log(err))
        res.send(blog)
    },
    delete: async (req, res, next) => {
        const { uId, fId } = req.body
        const fundraiser = await models.Blog.findById(fId)

        if (fundraiser.author != uId) {
            res.send({ notAuth: true })
        } else {
            await models.Blog.deleteOne({ _id: fId })
            await models.User.findByIdAndUpdate(uId, { $pull: { 'blogs': fId } })
            res.send({completed: true})
        }
    },
    edit: async (req, res, next) => {
        const { name, image, description, author, fundraiserId } = req.body
        const fundraiserNameRegex = /^[a-zA-Z.!?\"'`-]{6,30}$/
        const imageRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        const descriptionRegex = /^[a-zA-Z\d.!,\s?"'`-]{300,1000}$/

        const nameError = name.length > 0 ? (fundraiserNameRegex.test(name) ? '' : 'Invalid name') : null
        const imageError = image.length > 0 ? (imageRegex.test(image) ? '' : 'Invalid link') : null
        const descriptionError = description.length > 0 ? (descriptionRegex.test(description) ? '' : 'Invalid description') : null

        const blog = await models.Blog.findById(fundraiserId).catch(e => {
            res.send({ notFound: true })
        })

        if (blog.author != author) {
            res.send({ notAuth: true })
        } else if (nameError === null && imageError === null && descriptionError === null) {
            res.send({
                emptyError: 'At least one input field must be filled.'
            })
        } else if (nameError || imageError || descriptionError) {
            res.send({
                nameError,
                imageError,
                descriptionError
            })
        } else {
            if (name) await models.Blog.findByIdAndUpdate(fundraiserId, { 'name': name })
            if (description) await models.Blog.findByIdAndUpdate(fundraiserId, { 'description': description })
            if (image) await models.Blog.findByIdAndUpdate(fundraiserId, { 'image': image })
            res.send({
                completed: true
            })
        }
    },
    getMy: async(req, res, next) => {
        const { id } = req.body
        const populatedUser = await models.User.findById(id).populate('blogs')
        res.send(populatedUser.blogs)
    },
    getAll: async(req, res, next) => {
        const allBlogs = await models.Blog.find({})
        res.send(allBlogs)
    },
    getFour: async(req, res, next) => {
        const allBlogs = await models.Blog.find({})
        const fourBlogs = allBlogs.reverse().splice(0, 4)
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
            const createdBlog = await models.Blog.create({ name, image, description, author })
            .then(result => {
                res.send({'completed': true})
                return result
            })
            .catch(err => {
                res.send({'serverError': true})
            })
            await models.User.findByIdAndUpdate(author, {$push: {'blogs': createdBlog._id}})
        }
    }
}