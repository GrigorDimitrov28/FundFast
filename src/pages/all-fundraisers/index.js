import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import FundCard from '../../components/fund-card'
const Content = () => {
    const category = window.location.href.replace('http://localhost:3000/fundraisers/', '')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            const request = await fetch('http://localhost:9999/api/fundraiser/getAll', {
                method: 'POST',
                body: JSON.stringify({
                    category
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let response = await request.json()
            const rotations = Math.ceil((response.length) / 4)
            let newArr = []
            for (let i = 0; i < rotations; i++) {
                newArr.push([])
                for (let x = 0; x < 4; x++) {
                    newArr[i].push(response[0])
                    response.splice(0, 1)
                }
            }

            setPosts(newArr)
        }

        getPosts()
    }, [category])

    return (
        <div className={styles.content}>
            {posts && (posts.length === 0 ? <h1 className={styles.no}>No fundraisers yet.</h1> : posts.map(row => {
                return (
                    <div className={styles.row}> {row.length > 0 && row.map(fr => {

                        return fr ? <FundCard id={fr._id} image={fr.image}
                            name={fr.name} category={fr.category} description={fr.description.slice(0, 150)} /> : ''
                    })} 
                    
                    </div>
                )
            }))}
        </div>
    )
}

const AllFundraisers = () => {
    return (
        <Content />
    )
}

export default AllFundraisers