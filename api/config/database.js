const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
    return mongoose.connect(config.dbURL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true});
};