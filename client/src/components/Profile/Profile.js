import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

import {signout, deleteUser, updateUser} from '../../actions/auth'

import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const navigate = useNavigate()
    
    const [initials, setInitials] = useState('')
    const [formattedName, setFormattedName] = useState('') // Capitalized Name
    const [formData, setFormData] = useState({ displayName: '', email: '' })

    useEffect(() => {
        if (user) {
            setInitials(`${user.name.toUpperCase().split(' ')[0].split('')[0]}${user.name.toUpperCase().split(' ')[1].split('')[0]}`)
            setFormattedName(`
                ${user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1)}
                ${user.name.split(' ')[1].charAt(0).toUpperCase() + user.name.split(' ')[1].slice(1)}
            `)
            setFormData({displayName: user.name, email: user.email })
        }
    }, [user])

    const handleUpdateUser = () => {
        dispatch(updateUser(formData))
    }

    const handleSignout = () => {
        dispatch(signout())
        navigate('/')
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(navigate))
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
                        <p className="profile-name">{formattedName}</p>
                        <p className="profile-level">Level 1</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form className="profile-details main-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="name" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value.toLowerCase()})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value.toLowerCase()})} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="profile-image-container">
                    <Button variant="outline-primary" className="full-width-btn" onClick={handleUpdateUser}>Update Account Details</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="profile-image-container">
                    <Button variant="outline-secondary" className="full-width-btn" onClick={handleSignout}>Sign Out</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="profile-image-container">
                    <Button variant="outline-danger" className="full-width-btn" onClick={handleDeleteUser}>Delete User</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile