import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faNewspaper, faDumbbell, faUniversity, faUser, faCog, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)


    return (
        <div className='Sidebar'>
            <Link to="/profile" className='Sidebar__profile'>
                <div className='Sidebar__profile__image'>
                    {user.profileImage ? <img src={user.profileImage} /> : <FontAwesomeIcon icon={faUser} />}
                </div>
                <p className='Sidebar__profile__name'>{user.name}</p>
                <p className='Sidebar__profile__email'>{user.email}</p>
            </Link>
            <div className='Sidebar__links'>
                <Link to='/' className='Sidebar__link'>
                    <div><FontAwesomeIcon icon={faBookOpen} /></div>
                    <span>Dashboard</span>
                </Link>
                <Link to='/library' className='Sidebar__link'>
                    <div><FontAwesomeIcon icon={faUniversity} /></div>
                    <span>Library</span>
                </Link>
                <Link to='/challenge' className='Sidebar__link'>
                    <div><FontAwesomeIcon icon={faDumbbell} /></div>
                    <span>Challenges</span>
                </Link>
                <Link to='/feed' className='Sidebar__link'>
                    <div><FontAwesomeIcon icon={faNewspaper} /></div>
                    <span>News Feed</span>
                </Link>
            </div>
            <div className='Sidebar__bottom-links'>
                <Link to='/challenge' className='Sidebar__bottom-link'>
                    <Button><FontAwesomeIcon icon={faCog} /></Button>
                </Link>
                <Link to='/feed' className='Sidebar__bottom-link'>
                    <Button><FontAwesomeIcon icon={faDoorOpen} /></Button>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar