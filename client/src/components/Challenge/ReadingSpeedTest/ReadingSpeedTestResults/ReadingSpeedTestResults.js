
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { updateUser } from '../../../../actions/auth'
import useAddPoints from '../../../../hooks/use-add-points'
import './ReadingSpeedTestResults.css'
import ScrollToTopOnMount from '../../../common/ScrollToTopOnMount/ScrollToTopOnMount'
import Alert from '../../../common/Alert/Alert'
import BackButton from '../../../common/BackButton/BackButton'

const ReadingSpeedTestResults = ({ isInWelcomeModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addPoints = useAddPoints()
    const user = useSelector((state) => state.auth)
    const wpm = useSelector((state) => state.wpm)
    const [alertMessage, setAlertMessage] = useState('')


    useEffect(() => {
        if (isInWelcomeModal) {
            dispatch(updateUser({ wordsPerMinute: wpm }))
        }
    }, [])

    const handleSave = async () => {
        if (user.wordsPerMinute < wpm) {
            dispatch(updateUser({ wordsPerMinute: wpm }))
            addPoints(50)
        } else {
            dispatch(updateUser({ wordsPerMinute: wpm }))
        }
        setAlertMessage('Results saved to profile!')
    }

    const handleDiscard = () => navigate('/challenge')

    const handleRestart = () => navigate('/reading-speed-test')

    return (
        <div className='ReadingSpeedTestResults' >
            <ScrollToTopOnMount />
            <Row>
                <Col xs={12} className='ReadingSpeedTestResults__info' >
                    { !isInWelcomeModal && <BackButton content='Back' /> }
                    <p className='text-center '>Your Score:</p>
                    <h1 className='text-center ReadingSpeedTestResults__score' style={{ color: wpm >= user.wordsPerMinute ? 'var(--success)' : 'var(--danger)' }}>{wpm}</h1>
                    {wpm < user.wordsPerMinute && <p style={{textAlign:'center'}}>Your personal best is {user.wordsPerMinute}.<br /><span>Are you sure you wish to overwrite your record?</span></p>}
                </Col>
            </Row>
            {
                !isInWelcomeModal
                &&
                <Row>
                    <Col xs={12} className='ReadingSpeedTestResults__buttons'>
                        <Button variant="primary" className='full-width-btn' onClick={handleSave}>Save Results</Button>
                        <Button variant="secondary" className='full-width-btn' onClick={handleRestart}>Retake Test</Button>
                        <Button variant="danger" className='full-width-btn' onClick={handleDiscard}>Discard Results</Button>
                    </Col>
                </Row>
            }
            <Alert variant='success' content={alertMessage} onClose={() => setAlertMessage('')} />

        </div>
    );
}

export default ReadingSpeedTestResults;
