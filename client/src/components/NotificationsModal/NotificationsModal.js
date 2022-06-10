import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAngleRight, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import './NotificationsModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNotificationsModal } from '../../actions/notificationsModal'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { deleteNotification, markNotificationAsRead } from '../../actions/notifications'

const NotificationsModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const show = useSelector((state) => state.notificationsModal)
    const notifications = useSelector((state) => state.notifications)

    const toggleModal = () => dispatch(toggleNotificationsModal())

    const handleClickNotification = (notification) => {
        toggleModal()
        dispatch(markNotificationAsRead(notification._id))
        navigate(`/view-post/${notification.post}`)
    }

    const handleDeleteNotification = (id) => {
        dispatch(deleteNotification(id))
    }

    return <Modal centered show={show} onHide={toggleModal} className='NotificationsModal'>
        <Modal.Header closeButton>
            <h3 className='nm'>Notifications</h3>
        </Modal.Header>
        <Modal.Body className='d-flex flex-wrap NotificationsModal__body'>
            {
                notifications.map((notification) => {
                    if (!notification.viewed) return <div key={'modal' + notification._id} className='d-flex notification' >
                        <div className='mr-10 ml-10 notification__col-1' onClick={() => handleClickNotification(notification)}>
                            <FontAwesomeIcon icon={faCircle} color='var(--primary)' className='notification__dot'/>
                        </div>
                        <div className='notification__col-2' onClick={() => handleClickNotification(notification)}>
                            <p>{notification.createdBy.name + ' ' + notification.message}</p>
                            <p>{moment(notification.createdAt).format('MMM Do HH:MM a')}</p>
                        </div>
                        <div className='notification__col-3 mr-10 ml-10'>
                            <FontAwesomeIcon icon={faTrash} color='var(--secondary)' onClick={() => handleDeleteNotification(notification._id)}/>
                        </div>
                    </div>
                })
            }
            {
                notifications.map((notification) => {
                    if (notification.viewed) return <div key={'modal-read' + notification._id} className='d-flex notification' >
                        <div className='mr-10 ml-10 notification__col-1' onClick={() => handleClickNotification(notification)}>
                            <FontAwesomeIcon icon={faCircle} color='#00000000' className='notification__dot'/>
                        </div>
                        <div className='notification__col-2' onClick={() => handleClickNotification(notification)} >
                            <p>{notification.createdBy.name + ' ' + notification.message}</p>
                            <p>{moment(notification.createdAt).format('MMM Do HH:MM a')}</p>
                        </div>
                        <div className='notification__col-3 mr-10 ml-10'>
                            <FontAwesomeIcon icon={faTrash} color='var(--secondary)' onClick={() => handleDeleteNotification(notification._id)}/>
                        </div>
                    </div>
                })
            }
            {
                notifications.length === 0
                &&
                <h3 className='no-notifications'>No notifications</h3>
            }
        </Modal.Body>
    </Modal>
}

export default NotificationsModal