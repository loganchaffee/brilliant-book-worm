import React, {useEffect, useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Row, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faCog, faBell, faCircle } from '@fortawesome/free-solid-svg-icons'
import { markNotificationAsRead } from '../../actions/notifications'
import './TopNavbar.css'

function TopNavbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    const notifications = useSelector((state) => state.notifications)

    const selectNotification = (notification) => {
        navigate(notification.link)
        dispatch(markNotificationAsRead(notification._id))
    }

    return (
        <div className="TopNavbar" >
            <Link to="/profile" className='TopNavbar__profile'>
                <div className='TopNavbar__profile__image'>
                    {user.profileImage ? <img src={user.profileImage} /> : <FontAwesomeIcon icon={faUser} />}
                </div>
            </Link>

            <div className='TopNavbar__links'>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='TopNavbar__link'>
                        <FontAwesomeIcon icon={faBell} />
                        { notifications.length > 0 && <span> {notifications.length}</span> }
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{transform: 'translateX(-85%)', width: '350px', padding: '10px'}}>
                        {
                            notifications.length > 0
                            ?
                            notifications.map((notification) => {
                                return <div key={'notification' + notification._id} className='notifications-dropdown' onClick={() => selectNotification(notification)}>
                                    <p>
                                        { notification.createdBy.name } { notification.message } {' '}
                                        { !notification.viewed && <FontAwesomeIcon color='var(--bs-primary)' icon={faCircle} /> }
                                    </p>
                                </div>
                            })
                            :
                            <p>No New Notifications</p>
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Link to='/' className='TopNavbar__link'>
                    <div><FontAwesomeIcon icon={faCog} /></div>
                </Link>
            </div>
        </div>
    )
}

export default TopNavbar;
