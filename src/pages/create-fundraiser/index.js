import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import styles from './index.module.css'
import Input from '../../components/input'
import { Link } from 'react-router-dom'
import handleChange from '../../utils/validation/change'
import handleBlurCategory from '../../utils/validation/category'
import handleBlurName from '../../utils/validation/fundraiser-name'
import handleBlurLink from '../../utils/validation/link'
import handleBlurDescription from '../../utils/validation/description'
const CreateForm = () => {
    const history = useHistory()

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

    async function handleSubmit(e) {
        e.preventDefault()
        const fundraiser = {
            name: name.value,
            category: category.value,
            image: image.value,
            description: description.value
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

            if(response._id){
                console.log(response)
                history.push('/')
            }else {
                history.push('/500')
            }
            
        } catch (e) {
            history.push('/500')
        }

    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Create a fundraiser</h2>
                <form className={styles.loginForm}
                    onSubmit={(e) => handleSubmit(e)}>
                    <Input name="fundraiser-name"
                        type="text"
                        onChange={((e) => setName({ ...handleChange(e, 'fundraiser', name) }))}
                        onBlur={() => setName({ ...handleBlurName(name) })}
                        value={name.value}
                        placeholder="Fundraiser name" />
                    <p className={styles.error}> {name.errorMsg} </p>

                    <select value={category.value}
                        className={styles.select}
                        onChange={(e) => setCategory({ value: e.target.value, errorMsg: '' })}
                        onBlur={() => setCategory({ ...handleBlurCategory(category) })}>
                        <option hidden value="Category"> Category </option>
                        <option value="Donations">Donations</option>
                        <option value="Campaigns">Campaigns</option>
                        <option value="Product development">Product development</option>
                        <option value="Startups">Startups</option>
                    </select>
                    <p className={styles.error}> {category.errorMsg} </p>

                    <Input name="img-link"
                        type="text"
                        value={image.value}
                        onChange={((e) => setImage({ ...handleChange(e, 'link', image) }))}
                        onBlur={() => setImage({ ...handleBlurLink(image) })}
                        placeholder="Image link" />
                    <p className={styles.error}> {image.errorMsg} </p>

                    <textarea placeholder="Description"
                        className={styles.textarea}
                        value={description.value}
                        onChange={((e) => setDescription({ ...handleChange(e, 'description', description) }))}
                        onBlur={() => setDescription({ ...handleBlurDescription(description) })}
                    />
                    <p className={styles.error}> {description.errorMsg} </p>

                    <button type="submit"
                        className={styles.submit}
                        disabled={name.errorMsg
                            || category.errorMsg
                            || image.errorMsg
                            || description.errorMsg
                            || !name.value
                            || !category.value
                            || !image.value
                            || !description.value}>
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
        <div>
            <Navbar />
            <CreateForm />
            <Footer />
        </div>
    )
}

export default CreateFundraiserPage