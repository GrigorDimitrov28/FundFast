function handleChange(e, type, obj, password) {
    const usernameRegex = new RegExp("^[a-zA-Z\\d]{4,15}$", "g")
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", "g")
    const fundraiserNameRegex = new RegExp("^[a-zA-Z.!?\"'`-]{6,30}$", "g")
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    const descriptionRegex = new RegExp("^[a-zA-Z\\d.!?\"'`-]{100,500}$", "g")

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
    } else if (type === "fundraiser" && fundraiserNameRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "link" && linkRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    } else if (type === "description" && descriptionRegex.test(obj.value)) {
        obj.errorMsg = ""

        return obj
    }

    return obj
}

export default handleChange