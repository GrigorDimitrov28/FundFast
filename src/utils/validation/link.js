const handleBlurLink = (link) => {
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

    if(!linkRegex.test(link.value)){
        link.errorMsg = "Image link must be a valid http/https link"
        return link
    }else {
        link.errorMsg = ""
        return link
    }
}

export default handleBlurLink