import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import Input from '../../components/input'
import changeHandler from '../../utils/validation/change'
import moneyBlurHandler from '../../utils/validation/money'
import UserContext from '../../Context'

const Content = () => {
    const id = window.location.href.replace('http://localhost:3000/fundraiser/', '')
    const [fundraiser, setFundraiser] = useState({})
    const context = useContext(UserContext)
    const [author, setAuthor] = useState({})
    const history = useHistory()
    const [money, setMoney] = useState({
        value: '',
        errorMsg: ''
    })
    useEffect(() => {
        async function getAuthor(id) {
            const request = await fetch(`http://localhost:9999/api/user?id=${id}`)
            const data = await request.json()
            return data
        }
        async function getFundraiser() {
            const post = await fetch('http://localhost:9999/api/fundraiser/getFundraiser', {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await post.json()
            if (data._id) {
                console.log(data)
                let don = data.donations
                don = don.toFixed(2)
                data.donations = don
                don = data.money
                don = don.toFixed(2)
                data.money = don
                const author = await getAuthor(data.author)
                setAuthor(author)
                setFundraiser(data)
            } else {
                history.push('/404')
            }
        }
        getFundraiser()

    }, [history, id])

    const calcWidth = (needed, donated) => {
        if (donated === 0) {
            return { 'display': 'none' }
        } else if (donated >= needed) {
            return { 'width': '100%' }
        } else {
            if (needed === undefined || donated === undefined) return { 'display': 'none' }
            const percent = donated / needed * 100
            return ({ 'width': `${percent}%` })
        }
    }

    const handleClick = () => {
        if (context.user.money < money.value) {
            setMoney({ ...money, errorMsg: 'Account balance too low' })
        } else {
            fetch(`http://localhost:9999/api/fundraiser/donate`, {
                method: 'PUT',
                body: JSON.stringify({
                    donation: money.value,
                    uId: context.user.id,
                    fId: fundraiser._id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => history.go(0)).catch(err => console.error(err))
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.fundraiserStats}>
                <div className={styles.photoContainer}>
                    <img src={fundraiser.image} alt="fundraiser" />

                </div>
                <div className={styles.fundraiserDetails} >
                    <h4>{fundraiser.category}</h4>
                    <h1>{fundraiser.name}</h1>
                    <div className={styles.author}>
                        <p>Posted by: </p>
                        <div className={styles.authorProfilePic}
                            style={{ 'backgroundImage': `url(${author.image || 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'})` }} />
                        <p className={styles.authorName}>{author.username}</p>
                    </div>

                    <div className={styles.moneyStats}>
                        <p>Total donations: {fundraiser.donations}$</p>
                        <div className={styles.progressOutside}>
                            <div className={styles.progressInside}
                                style={calcWidth(fundraiser.money, fundraiser.donations)}></div>
                        </div>
                        <p>Money needed: {fundraiser.money}$</p>
                    </div>
                    {context.loggedIn && <div className={styles.fundButtons}>
                        <Input placeholder="Donate"
                            type="text"
                            value={money.value}
                            onChange={(e) => setMoney({ ...changeHandler(e, 'money', money) })}
                            onBlur={() => setMoney({ ...moneyBlurHandler(money) })} />
                        <button onClick={() => handleClick()}>Donate</button>
                    </div>}
                    {context.loggedIn && <p className={styles.error}>{money.errorMsg}</p>}
                </div>
            </div>
            <div className={styles.fundraiserDescription}>
                <h1>Description</h1>
                <p>{fundraiser.description}</p>
            </div>
        </div>
    )
}
const DetailsPage = () => {

    return (
        <Content />
    )
}

export default DetailsPage