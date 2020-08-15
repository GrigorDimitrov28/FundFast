import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../Context'
const Content = () => {
    const [myPosts, setPosts] = useState([])
    const context = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        async function getPosts() {
            const request = await fetch('http://localhost:9999/api/fundraiser/getMy', {
                method: 'POST',
                body: JSON.stringify({
                    id: context.user.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await request.json()
            setPosts(data)
        }

        getPosts()
    }, [])

    const handleClick = async id => {
        const request = await fetch('http://localhost:9999/api/fundraiser/delete', {
            method: 'POST',
            body: JSON.stringify({
                fId: id,
                uId: context.user.id
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        const response = await request.json()

        console.log(response)
        if (response.notAuth) {
            history.push('/401')
        } else if (response.completed) {
            history.go(0)
        }

    }

    return (
        <div className={styles.content}>
            <div className={styles.internalNav}>
                <Link to={'/account-info'}
                    className={styles.firstInternalLink}>My profile</Link>
                <Link to={'/account-settings'}
                    className={styles.internalLink}>Settings</Link>
                <Link to={'/account-fundraisers'} className={styles.activeLink}>Fundraisers</Link>
                <Link to={'/account-blogs'} className={styles.internalLink}>Blog posts</Link>
            </div>
            <div className={styles.fundraisers}>
                {myPosts.length > 0 && myPosts.map(post => {
                    return (
                        <div key={post._id}
                            className={styles.post}>
                            <img className={styles.postImage} src={post.image} />
                            <div className={styles.postContent}>
                                <div className={styles.upperPostContent}>
                                    <div className={styles.leftUpperPostContent}>
                                        <h2>{post.name}</h2>
                                        <h3 className={styles.postCategory}>{post.category}</h3>
                                    </div>
                                    <div className={styles.rightUpperPostContent}>
                                        <button className={styles.button}
                                            onClick={() => history.push(`/edit/${post._id}/${post.name}`)}>Edit</button>
                                        <button className={styles.button}
                                            onClick={() => handleClick(post._id)}>Delete</button>
                                    </div>
                                </div>

                                <p className={styles.postDescription}>{post.description}</p>
                                <div className={styles.bottomBorder}></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const MyFundraisers = () => {
    return (
        <Content />
    )
}

export default MyFundraisers