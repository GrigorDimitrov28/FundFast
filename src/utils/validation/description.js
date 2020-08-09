const handleBlurDescription = (description) => {
    const descriptionRegex = /^[a-zA-Z\d.!,\s?"'`-]{300,1000}$/

    if(description.value.length < 300){
        description.errorMsg = "Description must be at least 300 characters."
        return description
    }else if(description.value.length > 1000){
        description.errorMsg = "Description must be maximum 1000 characters."
        return description
    }else if(!descriptionRegex.test(description.value)){
        description.errorMsg = "Description can contain only letters, numbers and (\" ! ? , . - `)"
        return description
    }else {
        description.errorMsg = ""
        return description
    }
}

export default handleBlurDescription