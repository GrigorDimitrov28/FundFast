import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../Context'
const BlogPost = ({ image, name, description, isReq, id }) => {
    const history = useHistory()
    const context = useContext(UserContext)
    const handleClick = async id => {
        const request = await fetch('http://localhost:9999/api/blog/delete', {
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

    const handleRedirect = (d) => {
        history.push(`/blog/${d}`)
    }

    return (

        <div className={styles.post}>
            <div onClick={() => handleRedirect(id)} className={styles.photoContainer}
                style={{ 'backgroundImage': `url(${image})` }}>
            </div>

            <div className={styles.blogContent}>
                <h3 className={styles.blogName}>{name}</h3>
                <p>{description.slice(0, 300)}</p>
                <Link to={`/blog/${id}`}>Read more</Link>
                {isReq && <button onClick={() => history.push(`/update/blog/${id}/${name}`)} className={styles.button}>Edit</button>}
                {isReq && <button onClick={() => handleClick(id)} className={styles.button}>Delete</button>}
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
                    return <BlogPost key={blog._id} id={blog._id} name={blog.name} description={blog.description} image={blog.image} />
                })}
            </div>
        </div>
    )
}

export { BlogPosts, BlogPost };