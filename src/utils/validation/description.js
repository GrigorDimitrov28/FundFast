const handleBlurDescription = (description) => {
    const descriptionRegex = new RegExp("^[a-zA-Z\\d.!?\"'`-]{100,500}$", "g")

    if(description.value.length < 100){
        description.errorMsg = "Description must be at least 100 characters."
        return description
    }else if(description.value.length > 500){
        description.errorMsg = "Description must be maximum 500 characters."
        return description
    }else if(!descriptionRegex.test(description.value)){
        description.errorMsg = "Description can contain only letters, numbers and (\" ! ? . - `)"
        return description
    }else {
        description.errorMsg = ""
        return description
    }
}

export default handleBlurDescription