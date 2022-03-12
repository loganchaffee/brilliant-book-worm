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

import { signout, deleteUser, updateUser } from '../../actions/auth'

import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const books = useSelector((state) => state.books)
    const navigate = useNavigate()

    const [formattedName, setFormattedName] = useState('') // Capitalized Name
    const [bookData, setBookData] = useState({ completedBooks: [], reviewedBooks: [] }) // Capitalized Name
    const [formData, setFormData] = useState({ name: '', email: ''})
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
            setFormattedName(`
                ${user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1)}
                ${user.name.split(' ')[1].charAt(0).toUpperCase() + user.name.split(' ')[1].slice(1)}
            `)
            setFormData({ ...formData, name: user.name, email: user.email })
            setLocalUser(user)
        }
        if (books) {
            const completedBooks = books.filter((book) => book.isCompleted)
            const reviewedBooks = books.filter((book) => book.review)
            setBookData({ ...bookData, completedBooks: completedBooks, reviewedBooks: reviewedBooks})
        }
    }, [user])

    const handleProfileImageClick = () => {
        document.getElementById('fileInput').click()
    }

    const handleUpdateProfileImage = (e) => {
        const reader = new FileReader()
        reader.addEventListener('load', () =>  {
            dispatch(updateUser({ ...user, profileImage: reader.result }, setErrorMessage))
        })
        reader.readAsDataURL(e.target.files[0])
    }

    const handleUpdateUserCred = () => {
        dispatch(updateUser({ ...user, ...formData}, setErrorMessage))
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
                    <div className="profile-image-circle" onClick={handleProfileImageClick}>
                        {localUser.profileImage ? <img className='profile-image' src={localUser.profileImage} /> : localUser.name.split('')[0]}
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
                            <Form.Control type="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value.toLowerCase()})} />
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
                    <Button variant="outline-primary" className="full-width-btn" onClick={handleUpdateUserCred}>Update Account Details</Button>
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
                <Col xs={6}><p className="statistics__value">{localUser.wordsPerMinute} WPM</p></Col>
            </Row>
            <Row>
                <Col xs={6}>Books Read</Col>
                <Col xs={6}><p className="statistics__value">{bookData.completedBooks.length}</p></Col>
            </Row>
            <Row>
                <Col xs={6}>Reviews Written</Col>
                <Col xs={6}><p className="statistics__value">{bookData.reviewedBooks.length}</p></Col>
            </Row>
            <Row>
                <Col xs={6}>Points</Col>
                <Col xs={6}><p className="statistics__value">{localUser.points}</p></Col>
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
