
function handleBlurUsername(user) {
    const usernameRegex = new RegExp("^[a-zA-Z ]+$", "g")

    if (user.value.length < 4) {
        user.errorMsg = `Username must be at least 4 characters long.`
        
        return user
    } else if (user.value.length > 30) {
        user.errorMsg = `Username must be maximum 30 characters long.`
        
        return user
    } else if (!usernameRegex.test(user.value)) {
        user.errorMsg = `Username can contain only letters and spaces.`
        
        return user
    } else {
        user.errorMsg = ""
        
        return user
    }

}

export default handleBlurUsername