import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import ReadingSpeedTest from '../Challenge/ReadingSpeedTest/ReadingSpeedTest'
import './NewUserWelcomeModal.css'
import WelcomePage from './WelcomePage/WelcomePage'
import FinishProfileSetup from './FinishProfileSetup/FinishProfileSetup'

import InitialSpeedTest from './InitialSpeedTest/InitialSpeedTest'
import { updateUser } from '../../actions/auth'

const NewUserWelcomeModal = () => {
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [show, setShow] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)

    const handleFinish = () => {
        setShow(false)
        dispatch(updateUser({ isNewUser: false }))
    }

    const pages = [
        <WelcomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <FinishProfileSetup currentPage={currentPage} setCurrentPage={setCurrentPage}/>,
        <InitialSpeedTest currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <div className='animate-up-and-in' style={{marginTop: '30vh'}}>
            <h2 style={{ textAlign: 'center'}}>Your All Set, {user.name.split(' ')[0]}!</h2>
            <div className='d-flex justify-content-center'>
                <Button className='WelcomePage__last-button' onClick={handleFinish}>Begin</Button>
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
