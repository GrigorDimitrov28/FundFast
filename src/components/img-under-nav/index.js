import React from 'react'
import styles from './index.module.css'
import LinkComponent from '../links'

const HomeHeaderPhoto = ( { btnText, href, pText}) => {
    return (
        <div className={styles.container}>
            <img className={styles['big-photo']}
                src="./1.png" alt="header"/>

            <div className={styles.join}>
                <p className={styles.joinUsBlack}>{pText}</p>
            </div>

            <LinkComponent text={btnText} type={"button"} href={href} />

        </div>
    )
}

const BlogHeaderPhoto = ( {btnText, href, pText } ) =>{
    return (
        <div className={styles.container}>
            <img className={styles['big-photo']}
                src="./3.png" alt="header"/>

            <div className={styles.join}>
                <p className={styles.joinUsBlack}>{pText}</p>
            </div>

            <LinkComponent text={btnText} type={"button"} href={href} />

        </div>
    )
}

const AboutHeaderPhoto = ({ btnText, href, pText}) => {
    return (
        <div className={styles.container}>
            <img className={styles['big-photo']}
                src="./2.png" alt="header"/>
            <div className={styles.join}>
                <p className={styles.joinUsWhite}>{pText}</p>
            </div>

            <LinkComponent text={btnText} type={"button"} href={href} />

        </div>
    )
}

export { HomeHeaderPhoto, AboutHeaderPhoto, BlogHeaderPhoto }


