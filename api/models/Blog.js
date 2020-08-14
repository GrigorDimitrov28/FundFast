const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Model = mongoose.model
const { String, ObjectId } = Schema.Types

const fundraiserSchema = new Schema({

    name: {
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
    }
})


module.exports = new Model('Blog', fundraiserSchema)