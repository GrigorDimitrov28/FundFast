const models = require('../models')

module.exports = {
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