
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { updateUser } from '../../../../actions/auth'
import './ReadingSpeedTestResults.css'

const ReadingSpeedTestResults = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    const wpm = useSelector((state) => state.wpm)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSave = async () => {
        if (user.wordsPerMinute < wpm) {
            dispatch(updateUser({ ...user, wordsPerMinute: wpm, points: user.points + 50 }, setErrorMessage, navigate, '/profile'))
        } else {
            dispatch(updateUser({ ...user, wordsPerMinute: wpm }, setErrorMessage, navigate, '/profile'))
        }
    }

    const handleDiscard = () => navigate('/challenge')

    const handleRestart = () => navigate('/reading-speed-test')

    return (
        <div className='ReadingSpeedTestResults' >
            <Row>
                <Col xs={12}>
                    <h3 className='text-center'>Your Score:</h3>
                    <h4 className='text-center'>{wpm} Words Per Minute</h4>
                    {wpm < user.wordsPerMinute && <p style={{textAlign:'center'}}>Your personal best is {user.wordsPerMinute}.<br />Are you sure you wish to overwrite your record?</p>}
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button variant="primary" className="full-width-btn" onClick={handleSave}>Save Results to Profile</Button>
                    <Button variant="secondary" className="full-width-btn" onClick={handleRestart}>Retake Test</Button>
                    <Button variant="danger" className="full-width-btn" onClick={handleDiscard}>Discard Results</Button>
                </Col>
            </Row>
        </div>
    );
}

export default ReadingSpeedTestResults;
