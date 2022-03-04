
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

const ReadingSpeedTestCompletion = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    
    return (
        <Container className='ReadingSpeedCompletion' style={{margin: 'auto 0'}}>
            <Row>
                <Col xs={12}>
                    <Button className="full-width-btn">Save Results to Profile</Button>
                    <Button className="full-width-btn">Discard Results</Button>
                    <Button className="full-width-btn">Retake Test</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ReadingSpeedTestCompletion;
