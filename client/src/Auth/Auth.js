import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/esm/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { signup, signin } from '../actions/auth.js';

import './Auth.css'


function Auth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') return
        if (formData.password !== formData.confirmPassword) return
        dispatch(signup({ ...formData, name: `${formData.firstName} ${formData.lastName}` }, navigate, setError))
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        if (formData.email === '' || formData.password === '') return
        dispatch(signin(formData, navigate, setError))
    }

    return (
        <Container className='Auth'>
            <Row>
                <Col xs={12}>
                    <h3 className='Auth__title'>{isSignup ? 'Sign Up' : 'Sign In'}</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {
                        isSignup
                        ? <>
                            <Form className='main-form'>
                                <Form.Group className="mb-3">
                                    <Form.Control type="name" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value.toLowerCase()})}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="name" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value.toLowerCase()})}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value.toLowerCase()})}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value.toLowerCase()})}/>
                                </Form.Group>
                            </Form>
                            <Row className='switch-form-btn-container'>
                                <Col xs={12}>
                                    <Button variant='outline-primary' className='full-width-btn Auth__submit-btn' onClick={handleSubmit}>Sign Up</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className='switch-form-btn-container'>
                                    <span className="switch-form-label">Already have an account?</span>
                                    <a className="switch-form-btn" onClick={() => setIsSignup(false)}>Sign In</a>
                                </Col>
                            </Row>
                        </>
                        : <>
                            <Form className='main-form'>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value.toLowerCase()})}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                                </Form.Group>
                            </Form>
                            <Row>
                                <Col>
                                    <Button variant='outline-primary' className='full-width-btn Auth__submit-btn' onClick={handleSignin}>Sign In</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='switch-form-btn-container'>
                                    <span className="switch-form-label">Don't have an account?</span>
                                    <a className="switch-form-btn" onClick={() => setIsSignup(true)}>Sign Up</a>
                                </Col>
                            </Row>
                            
                        </>
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {error && <Alert variant='warning'>{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}

export default Auth;
