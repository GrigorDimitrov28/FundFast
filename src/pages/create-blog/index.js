import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import Input from '../../components/input'
import { Link, useHistory } from 'react-router-dom'
import * as validator from '../../utils/validation'
import userContext from '../../Context'

const CreateForm = () => {
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
    const [isButtonDisabled, setDisabled] = useState(true)
    async function handleSubmit(e) {
        e.preventDefault()
        setProcessing(true)
        const blog = {
            name: name.value,
            image: image.value,
            description: description.value,
            author: context.user.id,
        }

        try {
            const data = await fetch('http://localhost:9999/api/blog/create', {
                method: 'POST',
                body: JSON.stringify(blog),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await data.json()

            if (response.nameError || response.descriptionError || response.imageError) {
                setName({ ...name, errorMsg: response['nameError'] })
                setImage({ ...image, errorMsg: response['imageError'] })
                setDescription({ ...description, errorMsg: response['descriptionError'] })
                setProcessing(false)
            }else if(response.notAuth){
                history.push('/401')
            }else if (response.completed === true) {
                history.push('/')
            } else {
                history.push('/500')
            }

        } catch (e) {
            setProcessing(false)
            history.push('/500')
        }

    }

    useEffect(() => {
        if (name.value && description.value && image.value &&
            !name.errorMsg && !description.errorMsg && !image.errorMsg && !isProcessing) {
            setDisabled(false)
        }
    }, [name, image, description, isProcessing])

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Write blog</h2>
                <form className={styles.loginForm}
                    onSubmit={(e) => handleSubmit(e)}>
                    <Input name="fundraiser-name"
                        className="loginInput"
                        type="text"
                        onChange={((e) => setName({...validator.change(e, 'name', name)}))}
                        onBlur={() => setName({...validator.fundName(name)})}
                        value={name.value}
                        placeholder="Blog name" />
                    <p className={styles.error}> {name.errorMsg} </p>

                    <Input name="img-link"
                        className="loginInput"
                        type="text"
                        value={image.value}
                        onChange={((e) => setImage({ ...validator.change(e, 'image', image) }))}
                        onBlur={() => setImage({...validator.link(image)})}
                        placeholder="Blog image" />
                    <p className={styles.error}> {image.errorMsg} </p>

                    <textarea placeholder="Blog content"
                        className={styles.textarea}
                        value={description.value}
                        onChange={((e) => setDescription({...validator.change(e, 'description', description)}))}
                        onBlur={() => setDescription({...validator.description(description)})}
                    />
                    <p className={styles.error}> {description.errorMsg} </p>

                    <button type="submit"
                        className={styles.submit}
                        disabled={isButtonDisabled}>
                        Create blog
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