const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Model = mongoose.model
const { String } = Schema.Types

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
    }
})


module.exports = new Model('Fundraiser', fundraiserSchema)