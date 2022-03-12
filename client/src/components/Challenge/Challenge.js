import React from 'react';
import {Link} from 'react-router-dom'
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';

function Challenge() {
    return (
        <Container className="Challenge">
            <Row>
                <Col xs={12}>
                    <h4 style={{ paddingLeft: '0' }}>Challenges</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{marginBottom: '10px'}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Reading Speed Test</Card.Title>
                            <Card.Text>Test your reading speed with a timed reading of a random excerpt. Find out your words per minute and Level up as you get faster!</Card.Text>
                            <Link to="/reading-speed-test">
                                <Button variant="primary">Start</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card style={{marginBottom: '10px'}}>
                        <Card.Body>
                            <Card.Title>Set a Reading Deadline</Card.Title>
                            <Card.Text>Hold yourself to a deadline to finish the books your reading and reach your reading goals</Card.Text>
                            <Link to="/challenge/reading-deadline">
                                <Button variant="primary">Start</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Challenge;
