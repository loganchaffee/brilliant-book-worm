import React, {useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './TopNavbar.css'

function TopNavbar() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)


    return (
        <Row>
            <Navbar className="TopNavbar" fixed="top" bg="light" variant="light" >
                <Container className='TopNavbar__content' fluid>
                    <Nav>
                        <Nav.Item style={{marginRight: '5%'}}>
                            <span className="TopNavbar__profile">
                                <Link to="/profile" >
                                    <FontAwesomeIcon icon={faUser} />
                                    {user && ` ${user.name}`}
                                </Link>
                            </span>
                        </Nav.Item>
                        <Nav.Item>
                            <FontAwesomeIcon icon={faCog} />
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </Row>
    )
}

export default TopNavbar;
