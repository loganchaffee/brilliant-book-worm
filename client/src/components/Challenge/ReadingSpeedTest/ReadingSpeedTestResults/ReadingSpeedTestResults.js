
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { updateUser } from '../../../../actions/auth'
import useAddPoints from '../../../../hooks/use-add-points'
import './ReadingSpeedTestResults.css'

const ReadingSpeedTestResults = ({ isInWelcomeModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addPoints = useAddPoints()
    const user = useSelector((state) => state.auth)
    const wpm = useSelector((state) => state.wpm)

    useEffect(() => {
        if (isInWelcomeModal) {
            dispatch(updateUser({ wordsPerMinute: wpm }))
        }
    }, [])

    const handleSave = async () => {
        if (user.wordsPerMinute < wpm) {
            dispatch(updateUser({ wordsPerMinute: wpm }))
            addPoints(50)
            navigate('/reading-speed-test')
        } else {
            dispatch(updateUser({ wordsPerMinute: wpm }))
        }
    }

    const handleDiscard = () => navigate('/challenge')

    const handleRestart = () => navigate('/reading-speed-test')

    return (
        <div className='ReadingSpeedTestResults' >
            <Row>
                <Col xs={12} className='ReadingSpeedTestResults__info' >
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
        </div>
    );
}

export default ReadingSpeedTestResults;
