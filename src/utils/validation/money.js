const handleBlurMoney = (money) => {
    const moneyRegex = /^[0-9]+(\.[0-9]{1,2})?$/

    if(money.value === ''){
        money.errorMsg = 'Field cannot be empty.'
        return money
    }else if(!moneyRegex.test(money.value)) {
        money.errorMsg = 'Invalid amount.'
        return money
    }else {
        money.errorMsg = ''
        return money
    }
}

export default handleBlurMoney