import styles from './index.module.css'
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'

function App({ navItemName, links, menuClass }) {
  return (
    <NavItem name={navItemName}>
      <DropdownMenu links={links} menuClass={menuClass}></DropdownMenu>
    </NavItem>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const history = useHistory()

  useEffect(() => {
    history.listen(location => {
      setOpen(false)
    })
  }, [])

  return (
    <div className={styles.container} >
      <button className={styles.dropButton}
        onClick={() => setOpen(!open)}> {props.name} </button>
      {open && props.children}
    </div>
  );
}

function DropdownMenu({ links, menuClass }) {
  const history = useHistory()
  const context = useContext(UserContext)

  const handleLogoutClick = () => {
    context.logOut()
    history.push('/')
  }
  const doNothing = () => {
    return
  }
  const handleSettingsClick = () => {
    history.push('/account-settings')
  }

  const handleAccountInfoClick = () => {
    history.push('/account-info')
  }

  return (
    <div className={styles[`${menuClass}`]}>
      {links.map(link => {
        return (
          <div key={links.indexOf(link)} className={styles['dropdown-item']}
           onClick={link === 'Account' ? handleAccountInfoClick : (link === 'Settings' ? handleSettingsClick :
           (link === 'Logout' ? handleLogoutClick : doNothing))} >
            <p>{link}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
