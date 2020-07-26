function handleBlurPassword(password) {
    const lowerCaseRegex = new RegExp("[a-z]+", "g")
    const upperCaseRegex = new RegExp("[A-Z]+", "g")
    const numberRegex = new RegExp("[0-9]+", "g")
    const specialCharRegex = new RegExp("[@$!%*?&]+", "g")
    
    if (password.length < 8) {
        return { passwordErrorIsHidden: false, passwordErrorMsg: `Password must be at least 8 characters long.` }
    } else if (password.length > 20) {
        return { passwordErrorIsHidden: false, passwordErrorMsg: `Password must be maximum 20 characters long.` }
    } else if (!specialCharRegex.test(password)) {
        return { passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain one of these (@, $, !, %, *, ?, &).` }
    } else if (!numberRegex.test(password)) {
        return { passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain at least one digit.` }
    } else if (!upperCaseRegex.test(password)) {
        return { passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain at least one upper case letter.` }
    } else if (!lowerCaseRegex.test(password)) {
        return { passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain at least one lower case letter.` }
    } else {
        return { passwordErrorIsHidden: true }
    }
}

export default handleBlurPassword