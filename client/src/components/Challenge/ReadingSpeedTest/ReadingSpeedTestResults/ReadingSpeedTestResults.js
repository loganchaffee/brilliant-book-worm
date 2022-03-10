
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

import { updateUser } from '../../../../actions/auth'

const ReadingSpeedTestCompletion = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    const wpm = useSelector((state) => state.wpm)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSave = async () => {
        console.log(user);
        dispatch(updateUser({ ...user, wordsPerMinute: wpm}, setErrorMessage, navigate, '/profile'))
    }

    const handleDiscard = () => {
        navigate('/challenge')
    }

    const handleRestart = () => {
        navigate('/reading-speed-test')
    }
    
    return (
        <Container className='ReadingSpeedCompletion' style={{margin: 'auto 0'}}>
            <Row>
                <Col xs={12}>
                    <h3 className='text-center'>Your words per minute is:</h3>
                    <h3 className='text-center'>{wpm}</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button variant="outline-primary" className="full-width-btn" onClick={handleSave}>Save Results to Profile</Button>
                    <Button variant="outline-danger" className="full-width-btn" onClick={handleDiscard}>Discard Results</Button>
                    <Button variant="outline-secondary" className="full-width-btn" onClick={handleRestart}>Retake Test</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ReadingSpeedTestCompletion;
