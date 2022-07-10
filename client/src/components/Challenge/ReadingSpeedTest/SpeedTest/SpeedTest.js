import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Modal from 'react-bootstrap/esm/Modal';
import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faLeaf } from '@fortawesome/free-solid-svg-icons'
import './SpeedTest.css'
import { getBookExcerpt } from '../../../../api/index'
import { updateWpm } from '../../../../actions/wpm'
import StopWatch from '../StopWatch/StopWatch';
import './SpeedTest.css'

const SpeedTest = ({ isInWelcomeModal, step, setStep }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    const wpm = useSelector((state) => state.wpm)

    const [text, setText] = useState('')
    const [timerDetails, setTimerDetails] = useState({
        hasStarted: false,
        hasEnded: false,
        id: null,
        totalTime: 0,
    })

    // Get book excerpt
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getBookExcerpt()
                setText(data)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    const handleStart = () => {
        const id = setInterval(() => {
            setTimerDetails((prevTimerDetails) => {
                return { ...prevTimerDetails, totalTime: prevTimerDetails.totalTime + 1 }
            })
        }, 1000)
        setTimerDetails({ ...timerDetails, id: id, hasStarted: true})

        fireAnimation()
    }

    const handleFinish = () => {
        clearInterval(timerDetails.id)
        setTimerDetails({ ...timerDetails, hasEnded: true })
        const wordCount =  text.split(" ").length
        const minutes = Math.round(100 * (timerDetails.totalTime / 60)) / 100
        const wordsPerMinute = Math.round( wordCount / minutes)
        dispatch(updateWpm(wordsPerMinute))
        endAnimation()
        
        if (isInWelcomeModal) return setStep(step + 1)

        navigate('/reading-speed-test/results')
    }

    const fireAnimation = () => {
        document.getElementsByClassName('StopWatch-container')[0].style.animationName = 'rockStopWatch'
        document.getElementsByClassName('side-head')[0].style.animationName = 'pushSideButton'
        document.getElementsByClassName('hand-container')[0].style.animationName = 'rotateHand'
    }

    const endAnimation = () => {
        document.getElementsByClassName('StopWatch-container')[0].style.animationName = ''
        document.getElementsByClassName('side-head')[0].style.animationName = ''
        document.getElementsByClassName('hand-container')[0].style.animationName = ''
    }

    return (
        <div className='SpeedTest'>
            <div className='d-flex justify-content-end' style={{marginBottom: '-55px'}}>
                <StopWatch />
            </div>
            <div className='ReadingSpeedTest__content'>
                <h3 style={{marginBottom: '30px'}}>Reading Speed Test</h3> 
                <h5 >Instructions:</h5>
                <p>Press start to reveal the book excerpt and start the timer. Read the text at your fastest speed while still comprehending.</p>
                {
                    !timerDetails.hasStarted 
                    &&
                    <Button variant='primary' onClick={handleStart}>Start</Button>
                }
                {
                    timerDetails.hasStarted 
                    &&
                    <div className='ReadingSpeedTest__paper'>
                        { timerDetails.hasStarted && <p>{text}</p> }
                    </div>
                }
                {
                    timerDetails.hasStarted 
                    &&
                    <Button variant='success' onClick={handleFinish}>Finish</Button>
                }
            </div>
        </div>
    )
}

export default SpeedTest