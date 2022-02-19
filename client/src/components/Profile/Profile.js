import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

import {signout} from '../../actions/auth'

import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const navigate = useNavigate()
    
    const [initials, setInitials] = useState('')
    const [formData, setFormData] = useState({ displayName: '', email: '' })

    useEffect(() => {
        setInitials(`${user.firstName.split('')[0]}${user.lastName.split('')[0]}`)
        setFormData({
            displayName: `${user.firstName} ${user.lastName}`,
            email: user.email,
        })
    }, [user])

    const handleSignout = () => {
        dispatch(signout())
        navigate('/')
    }
        
    return (
        <Container className="Profile">
            <Row>
                <Col xs={12}>
                    <h4 style={{ paddingLeft: '0' }}>Account Settings</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="profile-image-container">
                    <div className="profile-image">{initials}</div>
                    <div>
                        <p className="profile-name">{user.firstName + ' ' + user.lastName}</p>
                        <p className="profile-level">Level 1</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form className="profile-details main-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="name" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="profile-image-container">
                    <Button variant="secondary" className="full-width-btn" onClick={handleSignout}>Sign Out</Button>
                </Col>
            </Row>
          
        </Container>
    )
}

export default Profile