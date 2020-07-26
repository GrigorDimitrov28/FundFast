function handleBlurRePassword(password ,rePassword) {
    if (rePassword !== password) {
        return { rePasswordErrorIsHidden: false, rePasswordErrorMsg: "Passwords should match." }
    } else {
        return { rePasswordErrorIsHidden: true }
    }
}

export default handleBlurRePassword