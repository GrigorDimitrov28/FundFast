import React from 'react'
import styles from './index.module.css'
import LinkComponent from '../links'

const Photo = ({ source }, props) => {
    return (
        <div className={styles.container}>
            <img className={styles['big-photo']}
                src="./1.png" />


            <div className={styles.join}>
            <p className={styles.join}>Join us now and make your change.</p>
            </div>

            <LinkComponent text={"Sign Up"} type={"button"} href={"/register"}/>

        </div>
    )
}

export default Photo;
