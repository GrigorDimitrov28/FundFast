import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Input from '../../components/input'
import { Link } from 'react-router-dom'
import * as validator from '../../utils/validation'
import userContext from '../../Context'

const CreateForm = () => {
    const history = useHistory()
    const context = useContext(userContext)
    const [name, setName] = useState({
        value: '',
        errorMsg: ''
    })

    const [category, setCategory] = useState({
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

    const [money, setMoney] = useState({
        value: '',
        errorMsg: ''
    })
    const [isProcessing, setProcessing] = useState(false)
    const [isButtonDisabled, setDisabled] = useState(true)
    async function handleSubmit(e) {
        e.preventDefault()
        setProcessing(true)
        const fundraiser = {
            name: name.value,
            category: category.value,
            image: image.value,
            description: description.value,
            money: money.value,
            author: context.user.id
        }

        try {
            const data = await fetch('http://localhost:9999/api/fundraiser/create', {
                method: 'POST',
                body: JSON.stringify(fundraiser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await data.json()
            if (response.nameError || response.categoryError
                || response.descriptionError || response.imageError || response.moneyError) {
                setName({ ...name, errorMsg: response['nameError'] })
                setImage({ ...image, errorMsg: response['imageError'] })
                setCategory({ ...category, errorMsg: response['categoryError'] })
                setDescription({ ...description, errorMsg: response['descriptionError'] })
                setMoney({ ...money, errorMsg: response['moneyError'] })
                setProcessing(false)
            } else if (response._id) {
                console.log(response)
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
        if (name.value && category.value && description.value && image.value
            && !name.errorMsg && !category.errorMsg && !description.errorMsg && !image.errorMsg
            && !isProcessing) {
            setDisabled(false)
        }
    }, [name, category, image, description, isProcessing])

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Create a fundraiser</h2>
                <form className={styles.loginForm}
                    onSubmit={(e) => handleSubmit(e)}>
                    <Input name="fundraiser-name"
                        className="loginInput"
                        type="text"
                        onChange={((e) => setName({ ...validator.change(e, 'fundraiser', name) }))}
                        onBlur={() => setName({ ...validator.fundName(name) })}
                        value={name.value}
                        placeholder="Fundraiser name" />
                    <p className={styles.error}> {name.errorMsg} </p>

                    <select value={category.value}
                        className={styles.select}
                        onChange={(e) => setCategory({ value: e.target.value, errorMsg: '' })}
                        onBlur={() => setCategory({ ...validator.category(category) })}>
                        <option hidden value="Category"> Category </option>
                        <option value="Donations">Donations</option>
                        <option value="Campaigns">Campaigns</option>
                        <option value="Product development">Product development</option>
                        <option value="Startups">Startups</option>
                    </select>
                    <p className={styles.error}> {category.errorMsg} </p>

                    <Input name="img-link"
                        className="loginInput"
                        type="text"
                        value={image.value}
                        onChange={((e) => setImage({ ...validator.change(e, 'money', image) }))}
                        onBlur={() => setImage({ ...validator.link(image) })}
                        placeholder="Image link" />
                    <p className={styles.error}> {image.errorMsg} </p>

                    <Input name="money"
                        className="loginInput"
                        type="text"
                        value={money.value}
                        onChange={((e) => setMoney({ ...validator.change(e, 'money', money) }))}
                        onBlur={() => setMoney({ ...validator.money(money) })}
                        placeholder="Funds needed" />
                    <p className={styles.error}> {money.errorMsg} </p>

                    <textarea placeholder="Description"
                        className={styles.textarea}
                        value={description.value}
                        onChange={((e) => setDescription({ ...validator.change(e, 'description', description) }))}
                        onBlur={() => setDescription({ ...validator.description(description) })}
                    />
                    <p className={styles.error}> {description.errorMsg} </p>

                    <button type="submit"
                        className={styles.submit}
                        disabled={isButtonDisabled}>
                        Create fundraiser
                        </button>
                </form >
                <div className={styles.new}>
                    <p>Made a mistake?</p>
                    <Link to={'/'} className={styles.register}>Go back</Link>
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