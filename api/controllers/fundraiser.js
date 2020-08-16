const models = require('../models')
const utils = require('../utils')

module.exports = {
    getAll: async(req, res, next) => {
        const { category } = req.body
        const fundraisers = await models.Fundraiser.find({ 'category': category})
        .catch(err => console.log(err))
        res.send(fundraisers)
    },
    like: async(req,res,next) => {
        const { uId, fId } = req.body
        const fundraiser = await models.Fundraiser.findById(fId)

        if(fundraiser.likedBy === undefined || !fundraiser.likedBy.includes(uId)){
            await models.Fundraiser.findByIdAndUpdate(fId, {$push: {'likedBy': uId}})
            res.send({liked: true})
            
        }else {
            await models.Fundraiser.findByIdAndUpdate(fId, {$pull: {'likedBy': uId}})
            res.send({unliked: true})
        }
    },
    delete: async (req, res, next) => {
        const { uId, fId } = req.body
        const fundraiser = await models.Fundraiser.findById(fId)

        if (fundraiser.author != uId) {
            res.send({ notAuth: true })
        } else {
            await models.Fundraiser.deleteOne({ _id: fId })
            await models.User.findByIdAndUpdate(uId, { $pull: { 'fundraisers': fId } })
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

        const fundraiser = await models.Fundraiser.findById(fundraiserId).catch(e => {
            res.send({ notFound: true })
        })

        if (fundraiser.author != author) {
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
            if (name) await models.Fundraiser.findByIdAndUpdate(fundraiserId, { 'name': name })
            if (description) await models.Fundraiser.findByIdAndUpdate(fundraiserId, { 'description': description })
            if (image) await models.Fundraiser.findByIdAndUpdate(fundraiserId, { 'image': image })
            res.send({
                completed: true
            })
        }
    },
    getMy: async (req, res, nex) => {
        const { id } = req.body
        const populatedUser = await models.User.findById(id).populate('fundraisers')
        res.send(populatedUser.fundraisers)
    },
    donate: async (req, res, nex) => {
        const { donation, uId, fId } = req.body

        const moneyError = utils.validate.depositMoney(donation)
        const user = await models.User.findById(uId)
        if (user.money < donation) {
            res.send({ moneyError: 'Account balance too low.' })
        } else if (moneyError) {
            res.send({ moneyError })
        } else {
            await models.User.findByIdAndUpdate(uId, { $inc: { 'money': -donation, 'donated': donation } })
            await models.Fundraiser.findByIdAndUpdate(fId, { $inc: { 'donations': donation } })
            const money = await models.Fundraiser.findById(fId)
            res.send({m: money.donations})
        }
    },
    getByCategory: (req, res, nex) => {
        models.Fundraiser.find({ category: req.body.category })
            .then((data) => res.send(data.sort((a,b) => b.likedBy.length - a.likedBy.length).slice(0, 4)))
            .catch((err) => res.status(500).send('Error'))
    },

    getById: (req, res, next) => {
        models.Fundraiser.findById(req.body.id)
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(404).send(err))
    },

    post: async (req, res, next) => {
        const { name, category, image, description, money, author } = req.body
        const nameError = utils.validate.fundraiserName(name)
        const categoryError = utils.validate.fundraiserCategory(category)
        const imageError = utils.validate.imageLink(image)
        const descriptionError = utils.validate.fundraiserDescription(description)
        const moneyError = utils.validate.depositMoney(money)

        if (nameError || categoryError || imageError || descriptionError || moneyError) {
            res.send({
                nameError,
                categoryError,
                imageError,
                descriptionError,
                moneyError
            })
        } else {
            const fundraiser = await models.Fundraiser.create({ name, category, image, description, money, author })
                .then((createdFundraiser) => {
                    return createdFundraiser
                })
                .catch((err) => {
                    console.log(err)
                })
            await models.User.findByIdAndUpdate(author, { $push: { fundraisers: fundraiser._id } })
            res.send(fundraiser)
        }

    }
}