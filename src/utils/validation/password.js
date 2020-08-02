function handleBlurPassword(password) {
    const lowerCaseRegex = new RegExp("[a-z]+", "g")
    const upperCaseRegex = new RegExp("[A-Z]+", "g")
    const numberRegex = new RegExp("[0-9]+", "g")
    const specialCharRegex = new RegExp("[@$!%*?&]+", "g")
    
    if (password.value.length < 8) {
        password.errorMsg = `Password must be at least 8 characters long.`
        return password
    } else if (password.value.length > 20) {
        password.errorMsg = `Password must be maximum 20 characters long.`
        return password
    } else if (!specialCharRegex.test(password.value)) {
        password.errorMsg = `Password must contain one of these (@, $, !, %, *, ?, &).`
        return password
    } else if (!numberRegex.test(password.value)) {
        password.errorMsg = `Password must contain at least one digit.`
        return password
    } else if (!upperCaseRegex.test(password.value)) {
        password.errorMsg = `Password must contain at least one upper case letter.`
        return password
    } else if (!lowerCaseRegex.test(password.value)) {
        password.errorMsg = `Password must contain at least one lower case letter.`
        return password
    } else {
        password.errorMsg = ""
        return password
    }
}

export default handleBlurPassword