function handleChange(e, type, obj, password) {
    const usernameRegex = new RegExp("^[a-zA-Z\\d]{4,15}$", "g")
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", "g")

    obj.value = e.target.value
    
    if (type === "user" && usernameRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "password" && passwordRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "rePassword" && obj.value === password) {
        obj.errorMsg = ""
        
        return obj
    }

    return obj
}

export default handleChange