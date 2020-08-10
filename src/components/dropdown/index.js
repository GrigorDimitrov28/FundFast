import styles from './index.module.css'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'

function App() {
  return (
    <NavItem>
      <DropdownMenu></DropdownMenu>
    </NavItem>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container} >
      <button className={styles.dropButton}
        onClick={() => setOpen(!open)}> More </button>
      {open && props.children}
    </div>
  );
}

function DropdownMenu() {
  const history = useHistory()
  const context = useContext(UserContext)

  const handleLogoutClick = () => {
    context.logOut()
    history.push('/')
  }

  const handleSettingsClick = () => {
    history.push('/account-settings')
  }

  const handleAccountInfoClick = () => {
    history.push('/account-info')
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles['dropdown-item']} onClick={handleAccountInfoClick} >
        <p>My profile</p>
      </div>
      <div className={styles['dropdown-item']} onClick={handleSettingsClick} >
        <p>Settings</p>
      </div>
      <div className={styles['dropdown-item']} onClick={handleLogoutClick}>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default App;
