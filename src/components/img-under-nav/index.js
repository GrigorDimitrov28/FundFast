import React from 'react';
import styles from './index.module.css';

const Photo = ({ source }) => {
    return (
        <div className={styles.photo} id="photo-holder">
            <img className={styles['big-photo']} src="big-image-2.jpg" alt="not working" />
        </div>
    )
}

export default Photo;
