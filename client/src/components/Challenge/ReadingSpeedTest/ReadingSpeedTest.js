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
    }

    const handleFinish = () => {
        clearInterval(timerDetails.id)
        setTimerDetails({ ...timerDetails, hasEnded: true })
        const wordCount =  text.split(" ").length
        const minutes = Math.round(100 * (timerDetails.totalTime / 60)) / 100
        const wordsPerMinute = Math.round( wordCount / minutes)
        dispatch(updateWpm(wordsPerMinute))
        navigate('/reading-speed-test/results')
    }

    return (
        <Container className='ReadingSpeedTest'>
            <Row>
                <Col xs={12} md={12}>
                    <Link to="/challenge" className='back-arrow' onClick={() => clearInterval(timerDetails.id)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3>Reading Speed Test</h3>
                    <h5>Instructions:</h5>
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
                </Col>
            </Row>
        </Container>
    );
}

export default ReadingSpeedTest;
