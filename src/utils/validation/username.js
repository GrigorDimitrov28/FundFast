
function handleBlurUsername(user) {
    const usernameRegex = new RegExp("^[a-zA-Z\\d]+$", "g")

    if (user.value.length < 4) {
        user.errorMsg = `Username must be at least 4 characters long.`
        
        return user
    } else if (user.value.length > 15) {
        user.errorMsg = `Username must be maximum 15 characters long.`
        
        return user
    } else if (!usernameRegex.test(user.value)) {
        user.errorMsg = `Username can contain only letters and digits.`
        
        return user
    } else {
        user.errorMsg = ""
        
        return user
    }

}

export default handleBlurUsername