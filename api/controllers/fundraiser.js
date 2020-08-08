const models = require('../models')

module.exports = {
    get: (req, res, nex) => {
        models.Fundraiser.find({category: req.body.category})
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send('Error'))
    },

    post: (req, res, next) => {
        const { name, category, image, description } = req.body

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