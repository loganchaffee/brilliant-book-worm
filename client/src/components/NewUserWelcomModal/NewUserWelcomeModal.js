import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import ReadingSpeedTest from '../Challenge/ReadingSpeedTest/ReadingSpeedTest'
import './NewUserWelcomeModal.css'
import WelcomePage from './WelcomePage/WelcomePage'
import FinishProfileSetup from './FinishProfileSetup/FinishProfileSetup'

import InitialSpeedTest from './InitialSpeedTest/InitialSpeedTest'

const NewUserWelcomeModal = () => {
    const user = useSelector((state) => state.auth)

    const [show, setShow] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = [
        <WelcomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <FinishProfileSetup currentPage={currentPage} setCurrentPage={setCurrentPage}/>,
        <InitialSpeedTest currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <div style={{marginTop: '30vh'}}>
            <h3 style={{ textAlign: 'center'}}>Your All Set, {user.name.split(' ')[0]}!</h3>
            <div className='d-flex justify-content-center'>
                <Button onClick={() => setShow(false)}>Begin Using Bookworm</Button>
            </div>
        </div>
    ]

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
        <Modal fullscreen={true} show={show} onHide={handleClose} animation={false} className='NewUserWelcomeModal'>
            <Modal.Body>
                <div className='NewUserWelcomeModal__page'>
                    {pages[currentPage]}
                </div>
            </Modal.Body>
      </Modal>
    </>
}

export default NewUserWelcomeModal

/* 
    1. Welcome
    2. Profile User Details
    2. WPM Test
    3. WPM Test Results

    4. Walk-through
        1. Dashboard
            1. Add a book
            2. Edit a book
            3. Statistics
                1. Level up
                2. Deadlines
        2. Library
            1. Review book
        3. Challenge
            1. Reading Speed Test
            2. Reading Deadlines
        4. News Feed
            1. Auto Generated Posts
            2. Find Other Users
        5. Profile 
            1. Edit User Details
            2. Log out or Delete Account
    4. Welcome message / close btn
*/