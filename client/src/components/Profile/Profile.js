import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

import {signout, deleteUser, updateUser, updateUserProfileImage} from '../../actions/auth'

import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const navigate = useNavigate()
    
    const [initials, setInitials] = useState('')
    const [formattedName, setFormattedName] = useState('') // Capitalized Name
    const [formData, setFormData] = useState({ displayName: '', email: ''})
    const [profileImage, setProfileImage] = useState({ base64: '' })
    const [errorMessage, setErrorMessage] = useState('')
    const [localUser, setLocalUser] = useState({
        _id: '',
        name:'' ,
        email: '',
        password: '',
        wordsPerMinute: '',
        profileImage: ''
    })

    useEffect(() => {
        if (user) {
            setInitials(`${user.name.toUpperCase().split(' ')[0].split('')[0]}${user.name.toUpperCase().split(' ')[1].split('')[0]}`)
            setProfileImage( { base64: user.profileImage} )
            setFormattedName(`
                ${user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1)}
                ${user.name.split(' ')[1].charAt(0).toUpperCase() + user.name.split(' ')[1].slice(1)}
            `)
            setFormData({ ...formData, displayName: user.name, email: user.email })
            setLocalUser(user)
        }
    }, [user])

    const handleProfileImageClick = () => {
        document.getElementById('fileInput').click()
    }

    const handleUpdateProfileImage = (e) => {
        const reader = new FileReader()
        reader.addEventListener('load', () =>  {
            setProfileImage({ base64: reader.result })
            dispatch(updateUserProfileImage({ base64: reader.result }))
        })
        reader.readAsDataURL(e.target.files[0])
    }

    const handleUpdateUser = () => {
        dispatch(updateUser(formData, setErrorMessage))
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
                    <div className="profile-image-circle">
                        {profileImage.base64 ? <img className='profile-image' src={profileImage.base64} onClick={handleProfileImageClick}/> : 'LC'}
                    </div>
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
                <Col xs={12}>
                    <Button variant="outline-primary" className="full-width-btn" onClick={handleUpdateUser}>Update Account Details</Button>
                    <Button variant="outline-secondary" className="full-width-btn" onClick={handleSignout}>Sign Out</Button>
                    <Button variant="outline-danger" className="full-width-btn" onClick={handleDeleteUser} disabled>Delete Account</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3>Statistics</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>Reading Speed</Col>
                <Col  xs={6}><p className="statistics__value">{localUser.wordsPerMinute} WPM</p></Col>
            </Row>
            <Row>
                <Col xs={6}>Books Read</Col>
                <Col xs={6}><p className="statistics__value">0</p></Col>
            </Row>
            <Row>
                <Col xs={6}>Reviews Written</Col>
                <Col xs={6}><p className="statistics__value">0</p></Col>
            </Row>
            <Row>
                <Col xs={6}>Following</Col>
                <Col xs={6}><p className="statistics__value">0</p></Col>
            </Row>
            <Row>
                <Col xs={6}>Followers</Col>
                <Col xs={6}><p className="statistics__value">0</p></Col>
            </Row>


            {/* Invisible input clicked when profile image is clicked */}
            <Form.Control id="fileInput" style={{display: 'none'}} type="file" onChange={(e) => handleUpdateProfileImage(e)} />
        </Container>
    )
}

export default Profile

