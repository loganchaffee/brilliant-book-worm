import React from 'react'
import './LargeTopNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faCog, faBell, faCircle } from '@fortawesome/free-solid-svg-icons'

const LargeTopNavbar = () => {
    return (
        <div className='LargeTopNavbar'>
            <div>
                <FontAwesomeIcon icon={faBell} />
            </div>
            <div>
                <FontAwesomeIcon icon={faCog} />
            </div>
        </div>
    )
}

export default LargeTopNavbar