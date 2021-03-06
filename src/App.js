import React, { useState, useEffect, Suspense } from 'react'
import UserContext from './Context'

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return cookieValue ? cookieValue[2] : null;
}

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)


  const logIn = (user) => {
    setLoggedIn(true)
    setUser(user)
  }

  const logOut = () => {
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    setLoggedIn(false)
    setUser(null)
  }

  useEffect(() => {
    const token = getCookie('x-auth-token')

    if (!token) {
      logOut()
      return
    }

    fetch('http://localhost:9999/api/user/verify', {
      method: 'POST',
      body: JSON.stringify({
        token
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(promise => {
      return promise.json()
    }).then(response => {
      if (response.status) {
        logIn({
          username: response.user.username,
          id: response.user._id,
          image: response.user.image,
          money: response.user.money,
          donated: response.user.donated,
          email: response.user.email,
          blogs: response.user.blogs,
          fundraisers: response.user.fundraisers
        })
      } else {
        logOut()
      }
    })

  }, [])

  if (loggedIn === null) {
    return (<div>Loading...</div>)
  } else {
    return (
      <UserContext.Provider value={{
        loggedIn,
        user,
        logIn: logIn,
        logOut: logOut
      }}>
        <Suspense fallback={<div><h1>Loading...</h1></div>}>
        {props.children}
        </Suspense>
      </UserContext.Provider>
    )
  }
}

export default App