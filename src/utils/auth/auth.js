const authenticate = async (url, body, onSuccess, onFailure, onServerFailure, onValidationError) => {

    try {
        const data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const authToken = data.headers.get('Authorization')
        document.cookie = `x-auth-token=${authToken}`

        const response = await data.json()
        if(response.usernameError || response.passwordError || response.rePasswordError){
            return response
        }
        if (response.username && authToken) {
            onSuccess({
                username: response.username,
                id: response._id
            })
        } else {
            onFailure()
        }
    } catch (e) {
        onServerFailure()
    }
}


export default authenticate