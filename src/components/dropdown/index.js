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

  const handleClick = () => {
    context.logOut()
    history.push('/')
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles['dropdown-item']} onClick={handleClick} >
        <p>My profile</p>
      </div>
      <div className={styles['dropdown-item']} onClick={handleClick} >
        <p>Settings</p>
      </div>
      <div className={styles['dropdown-item']} onClick={handleClick}>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default App;
