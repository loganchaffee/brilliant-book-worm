import React, {useEffect, useState, useRef} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Row, Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faDoorOpen, faCog, faBell, faCircle } from '@fortawesome/free-solid-svg-icons'
import { markNotificationAsRead } from '../../actions/notifications'
import { toggleNotificationsModal } from '../../actions/notificationsModal';
import { signout } from '../../actions/auth'
import './TopNavbar.css'

function TopNavbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector((state) => state.auth)
    const notifications = useSelector((state) => state.notifications)
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    const [numOfNotifications, setNumOfNotifications] = useState(0)

    const selectNotification = (notification) => {
        navigate(notification.link)
        dispatch(markNotificationAsRead(notification._id))
    }

    const toggleModal = () => dispatch(toggleNotificationsModal())

    const handleSignout = () => {
        dispatch(signout())
        navigate('/')
    }

    useEffect(() => {
        const arr = [];
        for (let i = 0; i < notifications.length; i++) {
            const notification = notifications[i];
            if (!notification.viewed) arr.push('')
        }
        setNumOfNotifications(arr.length)
    }, [params])


    return <>
        <div className="TopNavbar" >
            <Link to="/profile" className='TopNavbar__profile' style={ user.profileImage ? {} : { border: '1px solid var(--white)' }}>
                <div className='TopNavbar__profile__image'>
                    {user.profileImage ? <img src={user.profileImage} /> : <FontAwesomeIcon icon={faUser} />}
                </div>
            </Link>

            <div className='TopNavbar__links'>
                <a className='Sidebar__link' onClick={toggleModal}>
                    <div style={{position: 'relative'}}>
                        <FontAwesomeIcon icon={faBell} />
                        {numOfNotifications > 0 && <div className='notification-number'>{numOfNotifications}</div>}
                    </div>
                    <span>Notifications</span>
                </a>
               
                <a className='Sidebar__link' >
                    <div style={{position: 'relative'}} onClick={() => setShowSignOutModal(true)}>
                        <FontAwesomeIcon icon={faDoorOpen} color="var(--white)" />
                    </div>
                </a>
            </div>
        </div>

        <Modal size='sm' centered show={showSignOutModal} onHide={() => setShowSignOutModal(false)}>
            <Modal.Header closeButton>
                <h3 className='nm'>Sign Out?</h3>
            </Modal.Header>
            <Modal.Body className='d-flex flex-wrap justify-content-center'>
                <Button className='mr-10' onClick={handleSignout}>Yes, Sign Out</Button>
                <Button variant='secondary' onClick={() => setShowSignOutModal(false)}>No, Cancel</Button>
            </Modal.Body>
        </Modal>
    </>
}

export default TopNavbar;
