
function handleBlurUsername(user) {
    const usernameRegex = /^[a-zA-Z а-яА-Я]{2,60}$/gu

    if (user.value.length < 4) {
        user.errorMsg = `Username must be at least 4 characters long.`
        
        return user
    } else if (user.value.length > 30) {
        user.errorMsg = `Username must be maximum 60 characters long.`
        
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