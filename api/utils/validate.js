const models = require('../models')
async function username(username, action) {
    const usernameRegex = /^[a-zA-Z ]{4,30}$/

    const user = await models.User.findOne({ username })
    if (username.length < 4) {
        return `Username must be at least 4 characters long.`
    } else if (username.length > 30) {
        return `Username must be maximum 30 characters long.`
    } else if (!usernameRegex.test(username)) {
        return `Username can contain only letters and spaces.`
    } else if (user !== null && action === 'register') {
        return `User already exists.`
    } else if (user === null && action === 'login') {
        return `User doesn't exist.`
    } else {
        return ``
    }
}

function password(password) {
    const lowerCaseRegex = new RegExp("[a-z]+", "g")
    const upperCaseRegex = new RegExp("[A-Z]+", "g")
    const numberRegex = new RegExp("[0-9]+", "g")
    const specialCharRegex = new RegExp("[@$!%*?&]+", "g")

    if (password.length < 8) {
        return `Password must be at least 8 characters long.`
    } else if (password.length > 20) {
        return `Password must be maximum 20 characters long.`
    } else if (!specialCharRegex.test(password)) {
        return `Password must contain one of these (@, $, !, %, *, ?, &).`
    } else if (!numberRegex.test(password)) {
        return `Password must contain at least one digit.`
    } else if (!upperCaseRegex.test(password)) {
        return `Password must contain at least one upper case letter.`
    } else if (!lowerCaseRegex.test(password)) {
        return `Password must contain at least one lower case letter.`
    } else {
        return ``
    }
}

function rePassword(rePassword, password) {
    if (rePassword !== password) {
        return `Passwords should match.`
    } else {
        return ``
    }
}

function fundraiserName(name) {
    const fundraiserNameRegex = /^[a-zA-Z.!?\"'`-]{6,30}$/

    if (name.length < 6) {
        return "Name must be at least 6 characters."
    } else if (name.length > 30) {
        return "Name must be maximum 30 characters."
    } else if (!fundraiserNameRegex.test(name)) {
        return "Name can contain only letters and \" ! ' ` ? ."
    } else {
        return ""
    }
}

function fundraiserCategory(category) {
    if (category !== 'Donations' && category !== 'Campaigns'
        && category !== 'Product development' && category !== 'Startups') {
        return "You must choose a category."
    }
}

function imageLink(link) {
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

    if (!linkRegex.test(link)) {
        return "Image link must be a valid http/https link"
    } else {
        return ""
    }
}

function fundraiserDescription(description) {
    const descriptionRegex = /^[a-zA-Z\d.!,\s?"'`-]{300,1000}$/

    if (description.length < 300) {
        return "Description must be at least 300 characters."
    } else if (description.length > 1000) {
        return "Description must be maximum 1000 characters."
    } else if (!descriptionRegex.test(description)) {
        return "Description can contain only letters, numbers and (\" ! ? , . - `)"
    } else {
        return ""
    }
}

function depositMoney(money){
    const moneyRegex = /^[0-9]+(\.[0-9]{1,2})?$/

    if(money === ''){
        return 'Field cannot be empty.'
    }else if(!moneyRegex.test(money)) {
        return 'Invalid amount.'
    }else {
        return ''
    }
}

function email(email){
    const emailRegex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/

    if(email === ''){
        return 'Field cannot be empty.'
    }else if(!emailRegex.test(email)) {
        return 'Invalid email.'
    }else {
        return ''
    }
}

module.exports = {
    username,
    password,
    rePassword,
    fundraiserName,
    fundraiserCategory,
    imageLink,
    fundraiserDescription,
    depositMoney,
    email
}