import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className='LandingPage'>
            <div className='LandingPage-navbar'>
                <Container>
                    <div className='LandingPage-navbar__left'>
                        <h3 className='logo mr-10'>BW   </h3>
                        <span>Learn More</span>
                    </div>
                    <div className='LandingPage-navbar__right'>
                        <span>Sign In</span>
                        <span>Sign Up</span>
                    </div>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col className='LandingPage__left'>
                        <h1>Up Your Reading Game</h1>
                        <p>Bookworm helps people track their reading, stay motivated, and keep up with friends and family to see what they are reading.</p>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage