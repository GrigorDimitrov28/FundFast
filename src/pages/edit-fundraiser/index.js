import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Input from '../../components/input'
import { Link } from 'react-router-dom'
import userContext from '../../Context'

const CreateForm = () => {
    const [fId, fundraiserName] = window.location.href.replace('http://localhost:3000/edit/', '').split('/')
    const history = useHistory()
    const context = useContext(userContext)
    const [name, setName] = useState({
        value: '',
        errorMsg: ''
    })

    const [image, setImage] = useState({
        value: '',
        errorMsg: ''
    })

    const [description, setDescription] = useState({
        value: '',
        errorMsg: ''
    })

    const [isProcessing, setProcessing] = useState(false)
    const [isButtonDisabled, setDisabled] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        setProcessing(true)
        const fundraiser = {
            name: name.value,
            image: image.value,
            description: description.value,
            author: context.user.id,
            fundraiserId: fId
        }

        try {
            const data = await fetch('http://localhost:9999/api/fundraiser/edit', {
                method: 'PUT',
                body: JSON.stringify(fundraiser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await data.json()
            console.log(response)
            if (response.notFound) {
                history.push('/404')
            } else if (response.notAuth) {
                history.push('/401')
            } else if (response.nameError || response.descriptionError || response.imageError) {
                setName({ ...name, errorMsg: response['nameError'] })
                setImage({ ...image, errorMsg: response['imageError'] })
                setDescription({ ...description, errorMsg: response['descriptionError'] })
                setProcessing(false)
            } else if(response.emptyError) {
                setName({...name, errorMsg: response.emptyError})
                setProcessing(false)
            }else if (response.completed === true) {
                history.push(`/fundraiser/${fId}`)
            } else {
                history.push('/500')
            }

        } catch (e) {
            setProcessing(false)
            history.push('/500')
        }

    }

    useEffect(() => {
        if (name.errorMsg && !description.errorMsg && !image.errorMsg && !isProcessing) {
            setDisabled(false)
        }
    }, [name, image, description, isProcessing])

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Edit {fundraiserName}</h2>
                <form className={styles.loginForm}
                    onSubmit={(e) => handleSubmit(e)}>
                    <Input name="fundraiser-name"
                        className="loginInput"
                        type="text"
                        onChange={((e) => setName({ ...name, value: e.target.value }))}
                        value={name.value}
                        placeholder="Edit fundraiser name" />
                    <p className={styles.error}> {name.errorMsg} </p>

                    <Input name="img-link"
                        className="loginInput"
                        type="text"
                        value={image.value}
                        onChange={((e) => setImage({ ...image, value: e.target.value }))}
                        placeholder="Edit image link" />
                    <p className={styles.error}> {image.errorMsg} </p>

                    <textarea placeholder="Edit description"
                        className={styles.textarea}
                        value={description.value}
                        onChange={((e) => setDescription({ ...description, value: e.target.value }))}
                    />
                    <p className={styles.error}> {description.errorMsg} </p>

                    <button type="submit"
                        className={styles.submit}
                        disabled={isButtonDisabled}>
                        Edit fundraiser
                        </button>
                </form >
                <div className={styles.new}>
                    <p>Made a mistake?</p>
                    <Link to={'/account-fundraisers'} className={styles.register}>Go back</Link>
                </div>
            </div>
        </div>
    )
}

const CreateFundraiserPage = () => {
    return (
        <CreateForm />
    )
}

export default CreateFundraiserPage