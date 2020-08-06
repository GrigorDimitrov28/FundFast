const handleBlurName = (name) => {
    const fundraiserNameRegex = new RegExp("^[a-zA-Z.!?\"'`-]{6,30}$", "g")

    if(name.value.length < 6) {
        name.errorMsg = "Name must be at least 6 characters."
        return name
    }else if (name.value.length > 30){
        name.errorMsg = "Name must be maximum 30 characters."
        return name
    }else if (!fundraiserNameRegex.test(name.value)){
        name.errorMsg = "Name can contain only letters and \" ! ' ` ? ."
        return name
    }else {
        name.errorMsg = ""
        return name
    }
}

export default handleBlurName