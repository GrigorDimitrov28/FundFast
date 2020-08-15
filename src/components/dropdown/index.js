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

  const handleClick = e => {
    const id = e.target.id || e.target.parentNode.id
    if(id === 'Account') history.push('/account-info')
    else if (id === 'Settings') history.push('/account-settings')
    else if (id === 'Logout') {context.logOut(); history.push('/')}
    else if(id === 'Donations') history.push('/fundraisers/Donations')
    else if(id === 'Campaigns') history.push('/fundraisers/Campaigns')
    else if(id === 'Product development') history.push('/fundraisers/ProductDevelopment')
    else if(id === 'Startups') history.push('/fundraisers/Startups')
  }

  return (
    <div className={styles[`${menuClass}`]}>
      {links.map(link => {
          return (
            <div id={link} key={links.indexOf(link)} className={styles['dropdown-item']}
              onClick={(e) => handleClick(e)} >
              <p>{link}</p>
            </div>
          )
      })}
    </div>
  );
}

export default App;
