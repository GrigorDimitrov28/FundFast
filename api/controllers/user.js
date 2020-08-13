const models = require('../models')
const config = require('../config/config')
const utils = require('../utils');

module.exports = {
    get: (req, res, next) => {
        models.User.findById(req.query.id)
            .then((user) => res.send(user))
            .catch((err) => res.status(500).send('Error'))
    },

    post: {
        register: async (req, res, next) => {
            const { username, password, rePassword } = req.body;
            const usernameError = await utils.validate.username(username, 'register')
            const passwordError = utils.validate.password(password)
            const rePasswordError = utils.validate.rePassword(rePassword, password)

            if (usernameError || passwordError || rePasswordError) {
                res.send({
                    usernameError,
                    passwordError,
                    rePasswordError
                })
            } else {
                models.User.create({ username, password })
                    .then((createdUser) => {
                        const token = utils.jwt.createToken({ id: createdUser._id });
                        res.header("Authorization", token).send(createdUser);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },

        verifyLogin: (req, res, next) => {
            const token = req.body.token || '';

            Promise.all([
                utils.jwt.verifyToken(token),
                models.TokenBlacklist.findOne({ token })
            ])
                .then(([data, blacklistToken]) => {
                    if (blacklistToken) { return Promise.reject(new Error('blacklisted token')) }

                    models.User.findById(data.id)
                        .then((user) => {
                            return res.send({
                                status: true,
                                user
                            })
                        });
                })
                .catch(err => {

                    if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                        res.status(401).send('UNAUTHORIZED!');
                        return;
                    }

                    res.send({
                        status: false
                    })
                })
        },

        login: async (req, res, next) => {
            const { username, password } = req.body
            const usernameError = await utils.validate.username(username, 'login')
            const passwordError = utils.validate.password(password)
            if (usernameError || passwordError) {
                res.send({
                    usernameError,
                    passwordError
                })
            } else {
                models.User.findOne({ username })
                    .then((user) => Promise.all([user, user.matchPassword(password)]))
                    .then(([user, match]) => {
                        if (!match) {
                            res.send({
                                usernameError: 'Invalid credentials',
                                passwordError: 'Invalid credentials'
                            });
                            return;
                        }

                        const token = utils.jwt.createToken({ id: user._id });
                        res.header("Authorization", token).send(user);
                    })
                    .catch(next);
            }
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                })
                .catch(next);
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        if (req.body.money) {
            const moneyError = utils.validate.depositMoney(req.body.money)
            if (moneyError) {
                res.send({ moneyError })
            } else {
                models.User.findOneAndUpdate({ _id: id }, { $inc: { 'money': req.body.money } })
                    .then((updatedUser) => res.send(updatedUser))
                    .catch(next)
            }
        } else if(req.body.email){
            const emailError = utils.validate.email(req.body.email)
            if(emailError){
                res.send({emailError})
            }else{
                models.User.updateOne({ _id: id }, req.body)
                .then((updatedUser) => res.send(updatedUser))
                .catch(next)    
            }
        } else if(req.body.image){
            const imageError = utils.validate.imageLink(req.body.image)
            console.log(imageError)
            if(imageError){
                res.send({imageError})
            }else{
                models.User.updateOne({ _id: id }, req.body)
                .then((updatedUser) => res.send(updatedUser))
                .catch(next)
            }
        } else {
            models.User.updateOne({ _id: id }, req.body)
                .then((updatedUser) => res.send(updatedUser))
                .catch(next)
        }
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
}