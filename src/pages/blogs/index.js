import React, { useEffect, useState } from 'react'
import { BlogHeaderPhoto } from '../../components/img-under-nav'
import styles from './index.module.css'
import { BlogPost } from '../../components/blog-posts'

const AllPosts = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function getBlogs() {
            const request = await fetch('http://localhost:9999/api/blog/getAll')
            const response = await request.json()
            setBlogs(response)
        }

        getBlogs()
    }, [])

    return (
        <div>
            <BlogHeaderPhoto href="/create-blog" pText="Write a blog and tell us your story." btnText="Write blog" />
            <div className={styles.content}>
                <div className={styles.posts}>
                    {blogs.map(blog => {
                        return <BlogPost name={blog.name} description={blog.description} image={blog.image} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllPosts 