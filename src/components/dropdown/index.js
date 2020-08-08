import styles from './index.module.css'
import { Link } from 'react-router-dom'
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
  
  const handleClick = () => {
    context.logOut()
    history.push('/')
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles['dropdown-item']}>
        <Link className={styles['dropdown-link']}>My profile</Link>
      </div>
      <div className={styles['dropdown-item']}>
        <Link className={styles['dropdown-link']}>Settings</Link>
      </div>
      <div className={styles['dropdown-item']}>
        <button className={styles['dropdown-button']}
          onClick={handleClick}>
          Logout
          </button>
      </div>
    </div>
  );
}

export default App;
