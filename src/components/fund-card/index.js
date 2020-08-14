import React from 'react'
import styles from './index.module.css'
import { Link, useHistory } from 'react-router-dom'
const Card = ({ id ,image, name, category, description }) => {
    const history = useHistory()
    const clickHandler = (e) => {
        history.push(`/fundraiser/${id}`)
    }

    return (
        <div className={styles.card} id={id}>
            <div className={styles.cardImage}
            style={{'backgroundImage': `url(${image})`}} 
            onClick={(e) => clickHandler(e)}/>
            <div className={styles.container}>
                <h3 className={styles.name}><b>{name}</b></h3>
                <h4 className={styles.category}>{category}</h4>
                <p>{description}</p>
                <Link to={`/fundraiser/${id}`}>Details</Link>
            </div>
        </div>
    )
}

export default Card;