import React from 'react';
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faNewspaper, faDumbbell, faUniversity } from '@fortawesome/free-solid-svg-icons'

import './BottomNavbar.css'

function BottomNavbar() {
    return (
        <div className='BottomNavbar'>
            <Link to='/' className='BottomNavbar__link'>
                <div><FontAwesomeIcon icon={faBookOpen} /></div>
            </Link>
            <Link to='/library' className='BottomNavbar__link'>
                <div><FontAwesomeIcon icon={faUniversity} /></div>
            </Link>
            <Link to='/challenge' className='BottomNavbar__link'>
                <div><FontAwesomeIcon icon={faDumbbell} /></div>
            </Link>
            <Link to='/feed' className='BottomNavbar__link'>
                <div><FontAwesomeIcon icon={faNewspaper} /></div>
            </Link>
        </div>
    )
}

export default BottomNavbar;
