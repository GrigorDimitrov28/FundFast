const models = require('../models')
const utils = require('../utils')

module.exports = {
    donate: async (req, res, nex) => {
        const { donation, uId, fId } = req.body
        
        const moneyError = utils.validate.depositMoney(donation)
        const user = await models.User.findById(uId)
        if(user.money < donation ){
            res.send({moneyError: 'Account balance too low.'})
        }else if(moneyError){
            res.send({moneyError})
        }else {
            await models.User.findByIdAndUpdate(uId, { $inc: { 'money': -donation , 'donated': donation} })
            await models.Fundraiser.findByIdAndUpdate(fId, {$inc: {'donations': donation}})
            res.send('Donation completed')
        }
    },
    getByCategory: (req, res, nex) => {
        models.Fundraiser.find({ category: req.body.category })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send('Error'))
    },

    getById: (req, res, next) => {
        models.Fundraiser.findById(req.body.id)
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(404).send(err))
    },

    post: (req, res, next) => {
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
            models.Fundraiser.create({ name, category, image, description, money, author })
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