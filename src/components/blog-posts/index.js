import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'

const BlogPost = ({ image, name, description }) => {
    return (

        <div className={styles.post}>
            <div className={styles.photoContainer}
                style={{ 'backgroundImage': `url(${image})` }}>
            </div>

            <div className={styles.blogContent}>
                <h3 className={styles.blogName}>{name}</h3>
                <p>{description.slice(0, 300)}</p>
                <a href="/read-more">Read more</a>
            </div>
        </div >

    )
}

const BlogPosts = () => {
    const [blogs, setBlogs] = useState([])

    const history = useHistory()
    const handleClick = () => {
        history.push('/create-blog')
    }

    useEffect(() => {
        async function getBlogs() {
            const request = await fetch('http://localhost:9999/api/blog/getFour')
            const response = await request.json()
            setBlogs(response)
        }

        getBlogs()
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.head}>Blog posts</h2>
                <button className={styles.create} onClick={handleClick}>Write a blog</button>
            </div>
            <div className={styles.posts}>
                {blogs.map(blog => {
                    return <BlogPost name={blog.name} description={blog.description} image={blog.image} />
                })}
            </div>
        </div>
    )
}

export { BlogPosts, BlogPost };