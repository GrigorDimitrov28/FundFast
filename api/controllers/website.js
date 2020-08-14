const models = require('../models')

module.exports = {
    getStats: async (req, res, next) => {
        let users = await models.User.find({})
        users = users.length

        let activeFundraisers = await models.Fundraiser.find({})
        activeFundraisers = activeFundraisers.length

        let blogs = await models.Blog.find({})
        blogs = blogs.length

        let moneyRaised = await models.User.find({})
        moneyRaised = moneyRaised.reduce((a, b) => a.donated + b.donated).toFixed(2)

        let totalFunded = await models.Fundraiser.find({})
        totalFunded = totalFunded.filter(x => x.donated >= x.money).length
        

        console.log(users, activeFundraisers, blogs, moneyRaised, totalFunded)
        res.send({
            users,
            activeFundraisers,
            blogs,
            moneyRaised,
            totalFunded
        })
    }
}