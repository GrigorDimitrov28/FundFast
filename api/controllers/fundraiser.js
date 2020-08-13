const models = require('../models')
const utils = require('../utils')

module.exports = {
    get: (req, res, nex) => {
        models.Fundraiser.find({ category: req.body.category })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send('Error'))
    },

    post: (req, res, next) => {
        const { name, category, image, description } = req.body
        const nameError = utils.validate.fundraiserName(name)
        const categoryError = utils.validate.fundraiserCategory(category)
        const imageError = utils.validate.imageLink(image)
        const descriptionError = utils.validate.fundraiserDescription(description)

        if (nameError || categoryError || imageError || descriptionError) {
            res.send({
                nameError,
                categoryError,
                imageError,
                descriptionError
            })
        } else {
            models.Fundraiser.create({ name, category, image, description })
                .then((createdFundraiser) => {
                    res.send(createdFundraiser)
                    console.log(createdFundraiser)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
}