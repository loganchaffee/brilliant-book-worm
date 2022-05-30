import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faNewspaper, faDumbbell, faUniversity } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import './BottomNavbar.css'

function BottomNavbar() {
    const params = useParams()

    const [currentTab, setCurrentTab] = useState()

    useEffect(() => {
        switch (window.location.pathname) {
            case '/':
                setCurrentTab('dashboard')
                break;
            case '/library':
                setCurrentTab('library')
                break;
            case '/challenge':
                setCurrentTab('challenge')
                break;
            case '/feed':
                setCurrentTab('feed')
                break;
            default:
                break;
        }
    }, [params])

    return (
        <div className='BottomNavbar'>
            <Link to='/' className={currentTab === 'dashboard' ? 'BottomNavbar__link BottomNavbar__link-current' : `BottomNavbar__link`}>
                <div><FontAwesomeIcon icon={faBookOpen} /></div>
            </Link>
            <Link to='/library' className={currentTab === 'library' ? 'BottomNavbar__link BottomNavbar__link-current' : `BottomNavbar__link`}>
                <div><FontAwesomeIcon icon={faUniversity} /></div>
            </Link>
            <Link to='/challenge' className={currentTab === 'challenge' ? 'BottomNavbar__link BottomNavbar__link-current' : `BottomNavbar__link`}>
                <div><FontAwesomeIcon icon={faDumbbell} /></div>
            </Link>
            <Link to='/feed' className={currentTab === 'feed' ? 'BottomNavbar__link BottomNavbar__link-current' : `BottomNavbar__link`}>
                <div><FontAwesomeIcon icon={faNewspaper} /></div>
            </Link>
        </div>
    )
}

export default BottomNavbar;
