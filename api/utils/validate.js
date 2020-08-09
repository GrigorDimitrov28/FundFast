function username(username) {
    const usernameRegex = new RegExp("^[a-zA-Z\\d]+$", "g")

    if (username.length < 4) {
        `Username must be at least 4 characters long.`
    } else if (username.length > 15) {
        `Username must be maximum 15 characters long.`
    } else if (!usernameRegex.test(username)) {
        return `Username can contain only letters and digits.`
    } else {
        return ``
    }
}

function password(password) {
    const lowerCaseRegex = new RegExp("[a-z]+", "g")
    const upperCaseRegex = new RegExp("[A-Z]+", "g")
    const numberRegex = new RegExp("[0-9]+", "g")
    const specialCharRegex = new RegExp("[@$!%*?&]+", "g")

    if (password.length < 8){
        return`Password must be at least 8 characters long.`
    }else if (password.length > 20){
        return `Password must be maximum 20 characters long.`
    }else if (!specialCharRegex.test(password)){
        return `Password must contain one of these (@, $, !, %, *, ?, &).`
    }else if (!numberRegex.test(password)){
        return `Password must contain at least one digit.`
    }else if (!upperCaseRegex.test(password)){
        return `Password must contain at least one upper case letter.`
    }else if (!lowerCaseRegex.test(password)){
        return `Password must contain at least one lower case letter.`
    }else {
        return ``
    }
}

function rePassword(rePassword, password) {
    if (rePassword !== password){
        return `Passwords should match.`
    }else {
        return ``
    }
}

module.exports = {
    username,
    password,
    rePassword
}