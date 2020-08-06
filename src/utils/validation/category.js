const handleBlurCategory = (category) => {
    if(category.value === ''){
        category.errorMsg = 'You must choose a category.'
        return category
    }else {
        category.errorMsg = ''
        return category
    }
}

export default handleBlurCategory