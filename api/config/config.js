const env = process.env.NODE_ENV || 'development';


const config = {
    development: {
        port: process.env.PORT || 9999,
        dbURL: `mongodb+srv://Me:4FeqbKYoJng16JqZ@softuni-cube-workshop-g9y4l.mongodb.net/react-project?retryWrites=true&w=majority`,
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];