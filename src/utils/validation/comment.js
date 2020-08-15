const comment = (description) => {
    const descriptionRegex = /^[a-zA-Z\d.!,\s?"'`-]{100,250}$/

    if(description.value.length < 100){
        description.errorMsg = "Comment must be at least 100 characters."
        return description
    }else if(description.value.length > 250){
        description.errorMsg = "Comment must be maximum 250 characters."
        return description
    }else if(!descriptionRegex.test(description.value)){
        description.errorMsg = "Comment can contain only letters, numbers and (\" ! ? , . - `)"
        return description
    }else {
        description.errorMsg = ""
        return description
    }
}

export default comment