const handleBlurEmail = (email) => {
    const emailRegex = /^[^@\s]+@[^@\s.]+.[^@.\s]+$/

    if(email.value === ''){
        email.errorMsg = 'Field cannot be empty.'
        return email
    }else if(!emailRegex.test(email.value)) {
        email.errorMsg = 'Invalid email.'
        return email
    }else {
        email.errorMsg = ''
        return email
    }
}

export default handleBlurEmail