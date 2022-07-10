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
import './ReadingSpeedTest.css'
import { getBookExcerpt } from '../../../api/index'
import { updateWpm } from '../../../actions/wpm'
import './ReadingSpeedTest.css'
import StopWatch from './StopWatch/StopWatch';
import SpeedTest from './SpeedTest/SpeedTest';

function ReadingSpeedTest() {
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
        navigate('/reading-speed-test/results')

        endAnimation()
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
        <div className='ReadingSpeedTest'>
            <div style={{marginBottom: '-40px'}}>
                <Link to="/challenge" className='back-arrow' onClick={() => clearInterval(timerDetails.id)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Link>
            </div>
            <SpeedTest />
        </div>
    );
}

export default ReadingSpeedTest;
