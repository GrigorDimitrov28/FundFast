import React, { useState } from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import styles from './index.module.css'
import Input from '../../components/input'
import { Link } from 'react-router-dom'

const CreateForm = () => {
    const [name, setName] = useState({
        value: '',
        error: ''
    })

    const [category, setCategory] = useState({
        value: '',
        error: ''
    })

    const [image, setImage] = useState({
        value: '',
        error: ''
    })

    const [description, setDescription] = useState({
        value: '',
        error: ''
    })

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Create a fundraiser</h2>
                <form className={styles.loginForm}>
                    <Input name="fundraiser-name"
                        type="text"
                        value={name.value}
                        placeholder="Fundraiser name" />
                    <p className={styles.error}> {} </p>

                    <select value={category.value} className={styles.select}>
                        <option value="" selected disabled hidden>Category</option>
                        <option value="Donations">Donations</option>
                        <option value="Campaigns">Campaigns</option>
                        <option value="Product development">Product development</option>
                        <option value="Startups">Startups</option>
                    </select>
                    <p className={styles.error}> {} </p>

                    <Input name="img-link"
                        value={image.value}
                        type="text"
                        placeholder="Image link" />
                    <p className={styles.error}> {} </p>

                    <textarea placeholder="Description" 
                    className={styles.textarea}
                    value={description.value} 
                    />
                    <p className={styles.error}> {} </p>

                    <button type="submit"
                        className={styles.submit}>
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