const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Model = mongoose.model
const { String, ObjectId } = Schema.Types

const fundraiserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    author: {
        type: ObjectId
    },

    money: {
        type: Number,
        default: 0,
        required: true
    },

    donations: {
        type: Number,
        default: 0
    },

    likedBy: [{
        type: ObjectId,
        ref: 'User'
    }]
})


module.exports = new Model('Fundraiser', fundraiserSchema)