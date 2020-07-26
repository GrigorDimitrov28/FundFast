function handleChange(e, type, password) {
    const usernameRegex = new RegExp("^[a-zA-Z\\d]{4,15}$", "g")
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", "g")

    const returnObj = { [`${type}`]: e.target.value }

    if (type === "username" && usernameRegex.test(e.target.value)) {
        returnObj.usernameErrorIsHidden = true
    } else if (type === "password" && passwordRegex.test(e.target.value)) {
        returnObj.passwordErrorIsHidden = true
    } else if (type === "rePassword" && e.target.value === password) {
        returnObj.rePasswordErrorIsHidden = true
    }

    return returnObj
}

export default handleChange