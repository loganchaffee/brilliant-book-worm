import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faNewspaper, faDumbbell, faUniversity, faUser, faCog, faDoorOpen, faBell } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'
import { toggleNotificationsModal } from '../../actions/notificationsModal';
import { fetchNotifications } from '../../api';
import { signout } from '../../actions/auth'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector((state) => state.auth)
    const notifications = useSelector((state) => state.notifications)

    const [currentTab, setCurrentTab] = useState()
    const [numOfNotifications, setNumOfNotifications] = useState(0)
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    // Notifications Modal
    const toggleModal = () => dispatch(toggleNotificationsModal())

    const handleSignout = () => {
        dispatch(signout())
        navigate('/')
    }

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

    useEffect(() => {
        const arr = [];
        for (let i = 0; i < notifications.length; i++) {
            const notification = notifications[i];
            if (!notification.viewed) arr.push('')
        }
        setNumOfNotifications(arr.length)
    }, [params])

    return <>
        <div className='Sidebar'>
            <Link to="/profile" className='Sidebar__profile'>
                <div className='Sidebar__profile__image'>
                    { user.profileImage ? <img src={user.profileImage} /> : <FontAwesomeIcon icon={faUser} color='var(--white)' /> }
                </div>
                <p className='Sidebar__profile__name'>{user.name}</p>
                {user.email.length < 20 && <p className='Sidebar__profile__email'>{user.email}</p>}
            </Link>
            <div className='Sidebar__links'>
                <Link
                    to='/'
                    className={currentTab === 'dashboard' ? 'Sidebar__link Sidebar__link-current' : `Sidebar__link`}
                >
                    <div><FontAwesomeIcon icon={faBookOpen} /></div>
                    <span>Dashboard</span>
                </Link>
                <Link
                    to='/library'
                    className={currentTab === 'library' ? 'Sidebar__link Sidebar__link-current' : `Sidebar__link`}
                >
                    <div><FontAwesomeIcon icon={faUniversity} /></div>
                    <span>Library</span>
                </Link>
                <Link
                    to='/challenge'
                    className={currentTab === 'challenge' ? 'Sidebar__link Sidebar__link-current' : `Sidebar__link`}
                >
                    <div><FontAwesomeIcon icon={faDumbbell} /></div>
                    <span>Challenges</span>
                </Link>
                <Link
                    to='/feed'
                    className={currentTab === 'feed' ? 'Sidebar__link Sidebar__link-current' : `Sidebar__link`}
                >
                    <div><FontAwesomeIcon icon={faNewspaper} /></div>
                    <span>News Feed</span>
                </Link>
                <a className='Sidebar__link' onClick={toggleModal}>
                    <div style={{position: 'relative'}}>
                        <FontAwesomeIcon icon={faBell} />
                        {numOfNotifications > 0 && <div className='notification-number'>{numOfNotifications}</div>}
                    </div>
                    <span>Notifications</span>
                </a>
            </div>
            <div className='Sidebar__bottom-links'>
                <Link to='/challenge' className='Sidebar__bottom-link'>
                    <Button><FontAwesomeIcon icon={faCog} /></Button>
                </Link>
                <div className='Sidebar__bottom-link'>
                    <Button onClick={() => setShowSignOutModal(true)}><FontAwesomeIcon icon={faDoorOpen} /></Button>
                </div>
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

export default Sidebar