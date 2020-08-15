function handleChange(e, type, obj, password, subscribeType) {
    const usernameRegex = /^[a-zA-Z ]{4,30}$/
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", "g")
    const fundraiserNameRegex = new RegExp("^[a-zA-Z.!?\"'`-]{6,30}$", "g")
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const descriptionRegex = /^[a-zA-Z\d.!,\s?"'`-]{300,1000}$/
    const emailRegex = /^[^@\s]+@[^@\s.]+.[^@.\s]+$/
    //TOTO: fix money regex
    const moneyRegex = /^[0-9]+(\.[0-9]{1,2})?$/
    const val = e.target.value === 'true' ? false : true
    const commentRegex = /^[a-zA-Z\d.!,\s?"'`-]{100,250}$/

    type!== 'subscribe' ? obj.value = e.target.value : obj.value[subscribeType] = val
    if (type === "user" && usernameRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if(type === 'comment' && commentRegex.test(obj.value)){
        obj.errorMsg = ""

        return obj
    }else if (type === "password" && passwordRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "rePassword" && obj.value === password) {
        obj.errorMsg = ""

        return obj
    } else if (type === "fundraiser" && fundraiserNameRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "link" && linkRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "description" && descriptionRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "money" && moneyRegex.test(obj.value)){
        obj.errorMsg = ""

        return obj
    } else if (type === "email" && emailRegex.test(obj.value)){
        obj.errorMsg = ""
        
        return obj
    }
    return obj
}

export default handleChange