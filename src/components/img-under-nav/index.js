import React from 'react';
import styles from './index.module.css';

const Photo = ({ source }) => {
    return (
        <div className={styles.photo} id="photo-holder">
            <img className={styles['big-photo']} 
            src="https://images.unsplash.com/photo-1578091436046-ecd3f4fe6992?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" />
        </div>
    )
}

export default Photo;
