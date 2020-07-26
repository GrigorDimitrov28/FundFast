
function handleBlurUsername(name) {
    const usernameRegex = new RegExp("^[a-zA-Z\\d]+$", "g")
    if (name.length < 4) {
        return { usernameErrorIsHidden: false, usernameErrorMsg: `Username must be at least 4 characters long.` }
    } else if (name.length > 15) {
        return { usernameErrorIsHidden: false, usernameErrorMsg: `Username must be maximum 15 characters long.` }
    } else if (!usernameRegex.test(name)) {
        return { usernameErrorIsHidden: false, usernameErrorMsg: `Username can contain only letters and digits.` }
    } else {
        return { usernameErrorIsHidden: true }
    }

}

export default handleBlurUsername