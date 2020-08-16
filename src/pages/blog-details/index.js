import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import * as validator from '../../utils/validation'

const Comment = ({ author, content }) => {
    return (
        <div className={styles.comm}>
            <h4>Posted by: {author}</h4>
            <p>{content}</p>
        </div>
    )
}
const Content = () => {
    const bId = window.location.href.replace('http://localhost:3000/blog/', '')
    const [blog, setBlog] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState({
        value: '',
        errorMsg: ''
    })
    const context = useContext(UserContext)

    useEffect(() => {
        async function getBlog() {
            const request = await fetch('http://localhost:9999/api/blog/getOne', {
                method: 'POST',
                body: JSON.stringify({
                    bId
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            const response = await request.json()
            setBlog(response)
            setComments(response.comments)
        }

        getBlog()
    }, [bId])

    const submitComment = () => {
        fetch('http://localhost:9999/api/blog/comment', {
            method: 'POST',
            body: JSON.stringify({
                author: context.user.username,
                content: comment.value,
                bId
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(data => data.json()).then(res => {
            setComments(res)
            setComment({ value: '', errorMsg: '' })
        })
    }

    return (
        <div className={styles.content}>
            <div className={styles.blogContent}>
                <img className={styles.blogImage} src={blog.image} alt="blog"/>
                <div className={styles.blogDescription}>
                    <h1 className={styles.blogName}>{blog.name}</h1>
                    <div className={styles.author}>
                        <p>Posted by: </p>
                        <div className={styles.authorProfilePic}
                            style={{ 'backgroundImage': `url(${context.user.image || 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'})` }} />
                        <p className={styles.authorName}>{context.user.username}</p>
                    </div>
                </div>
            </div>
            <div className={styles.blogText}>
                <p className={styles.text}>{blog.description}</p>
            </div>
            <div className={styles.addComment}>
                <div className={styles.textHolder}>
                    <textarea placeholder="Add a comment"
                        className={styles.textBox}
                        value={comment.value}
                        onChange={(e) => setComment({ ...validator.change(e, 'comment', comment) })}
                        onBlur={() => setComment({ ...validator.comment(comment) })}
                    >

                    </textarea>
                    <p className={styles.error}>{comment.errorMsg}</p>
                </div>
                <button className={styles.button}
                    onClick={() => submitComment()}
                    disabled={!comment.value || comment.errorMsg}>Add comment</button>
            </div>
            <div className={styles.comments}>
                {comments.length > 0 && comments.map(comment => {
                    return <Comment author={comment.author} content={comment.content}/>
                })}
            </div>
        </div>
    )
}

const BlogDetailsPage = () => {
    return (
        <Content />
    )
}

export default BlogDetailsPage