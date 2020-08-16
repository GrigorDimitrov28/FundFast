import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'
import { BlogPost } from '../../components/blog-posts'
const Content = () => {
    const [myBlogs, setBlogs] = useState([])
    const context = useContext(UserContext)

    useEffect(() => {
        async function getBlogs() {
            const request = await fetch('http://localhost:9999/api/blog/getMy', {
                method: 'POST',
                body: JSON.stringify({
                    id: context.user.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await request.json()
            setBlogs(data)
        }

        getBlogs()
    }, [context.user.id])

    return (
        <div className={styles.content}>
            <div className={styles.internalNav}>
                <Link to={'/account-info'}
                    className={styles.firstInternalLink}>My profile</Link>
                <Link to={'/account-settings'}
                    className={styles.internalLink}>Settings</Link>
                <Link to={'/account-fundraisers'} className={styles.internalLink}>Fundraisers</Link>
                <Link to={'/account-blogs'} className={styles.activeLink}>Blog posts</Link>
            </div>
            <div className={styles.fundraisers}>
                {myBlogs[0] && myBlogs.map(blog => {
                    return (
                        <BlogPost key={blog._id} 
                        name={blog.name} 
                        description={blog.description} 
                        image={blog.image}
                        isReq={true}
                        id={blog._id}/>
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