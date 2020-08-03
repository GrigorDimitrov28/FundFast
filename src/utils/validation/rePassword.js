function handleBlurRePassword(rePassword , password) {
    if (rePassword.value !== password.value) {
        rePassword.errorMsg = "Passwords should match."
        return rePassword
    } else {
        return rePassword
    }
}

export default handleBlurRePassword