import styles from './index.module.css'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
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


  return (
    <div className={styles.dropdown}>
      <div className={styles['dropdown-item']}>
        <Link className={styles['dropdown-link']}>My profile</Link>
      </div>
      <div className={styles['dropdown-item']}>
        <Link className={styles['dropdown-link']}>Settings</Link>
      </div>
      <div className={styles['dropdown-item']}>
        <Link className={styles['dropdown-link']}>Logout</Link>
      </div>
    </div>
  );
}

export default App;
