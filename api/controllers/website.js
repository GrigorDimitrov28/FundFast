const models = require('../models')

module.exports = {
    getStats: async (req, res, next) => {
        let users = await models.User.find({})
        let moneyRaised = 0
        users.forEach(user => moneyRaised += user.donated)
        users = users.length

        let activeFundraisers = await models.Fundraiser.find({})
        let totalFunded = 0
        activeFundraisers.forEach(fundraiser => {
            if(fundraiser.donations > fundraiser.money) totalFunded++
        })
        activeFundraisers = activeFundraisers.length

        let blogs = await models.Blog.find({})
        blogs = blogs.length
    
        res.send({
            users,
            activeFundraisers,
            blogs,
            moneyRaised,
            totalFunded
        })
    }
}