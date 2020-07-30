import React from 'react'
import styles from './index.module.css'
import LinkComponent from '../links'

const HomeHeaderPhoto = () => {
    return (
        <div className={styles.container}>
            <img className={styles['big-photo']}
                src="./1.png" />

            <div className={styles.join}>
                <p className={styles.joinUsBlack}>Join us now and make your change.</p>
            </div>

            <LinkComponent text={"Sign Up"} type={"button"} href={"/register"} />

        </div>
    )
}

const AboutHeaderPhoto = () => {
    return (
        <div className={styles.container}>
            <img className={styles['big-photo']}
                src="./2.png" />
            <div className={styles.join}>
                <p className={styles.joinUsWhite}>Join us now and make your change.</p>
            </div>

            <LinkComponent text={"Sign Up"} type={"button"} href={"/register"} />

        </div>
    )
}

export { HomeHeaderPhoto, AboutHeaderPhoto }


