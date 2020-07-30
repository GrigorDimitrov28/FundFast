import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
const BlogPost = () => {
    return (

        <div className={styles.post}>
            <Link to={'/'}>
                <img src="https://www.blogmarketingacademy.com/wp-content/uploads/2018/01/perfect-blog-post-1024x576.jpg" alt="blog-post" />
            </Link>
            <h3>Blog Name</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget consectetur purus. Praesent nisi tortor, imperdiet eu malesuada convallis, consequat.
            </p>
            <a href="/read-more">Read more</a>
        </div >

    )
}

const BlogPosts = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.head}>Blog posts</h2>
            <div className={styles.posts}>
                <div className={styles.topRow}>
                    <BlogPost />
                    <BlogPost />
                </div>
                <div className={styles.bottomRow}>
                    <BlogPost />
                    <BlogPost />
                </div>
            </div>
        </div>
    )
}

export default BlogPosts;