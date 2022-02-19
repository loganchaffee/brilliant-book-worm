import React from 'react';
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faNewspaper, faDumbbell, faUniversity } from '@fortawesome/free-solid-svg-icons'

import './BottomNavbar.css'

function BottomNavbar() {
    return (
        <>
            <Navbar fixed="bottom" bg="light" variant="light" className="BottomNavbar">
                <Container className="BottomNavBar__content" fluid>
                    <Nav style={{width: '100%'}} fill variant="tabs">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/"><FontAwesomeIcon icon={faBookOpen} /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/library"><FontAwesomeIcon icon={faUniversity} /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/challenge"><FontAwesomeIcon icon={faDumbbell} /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link as={Link} to="/feed"><FontAwesomeIcon icon={faNewspaper} /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default BottomNavbar;
