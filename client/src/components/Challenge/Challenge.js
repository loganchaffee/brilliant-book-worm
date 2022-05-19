import React from 'react';
import {Link} from 'react-router-dom'
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import './Challenge.css'

function Challenge() {
    return (
        <div className="Challenge">
            <Row>
                <Col xs={12}>
                    <h1>Challenges</h1>
                </Col>
            </Row>

            <Row style={{marginTop: '50px'}}>
                <Col xs={12} md={6}  style={{marginBottom: '10px'}}>
                    <div className='Challenge__card'>
                        <div>
                            <h2>Reading Speed Test</h2>
                            <p>Test your reading speed with a timed reading of a random excerpt. Find out your words per minute and Level up as you get faster!</p>
                        </div>
                        <Link to="/reading-speed-test">
                            <Button variant="primary">Start</Button>
                        </Link>
                    </div>
                </Col>
                <Col xs={12} md={6}  style={{marginBottom: '10px'}}>
                    <div className='Challenge__card'>
                        <div>
                            <h2>Set a Reading Deadline</h2>
                            <p>Hold yourself to a deadline to finish the books your reading and reach your reading goals</p>
                        </div>
                        <Link to="/challenge/reading-deadline">
                            <Button variant="primary">Start</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: '50px'}}>
                <Col></Col>
                
            </Row>
        </div>
    )
}

export default Challenge;
