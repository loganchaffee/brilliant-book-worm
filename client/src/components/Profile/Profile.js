import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

import { signout, deleteUser, updateUser, follow } from '../../actions/auth'
import { getCurrentVisitedUser,  } from '../../actions/currentVisitedUser';
import { fetchVisitedUserBooks } from '../../actions/currentVisitedUserBooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const books = useSelector((state) => state.books)
    const navigate = useNavigate()

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const [bookData, setBookData] = useState({ completedBooks: [], reviewedBooks: [] }) // Capitalized Name
    const [formData, setFormData] = useState({ name: '', email: ''})
    const [errorMessage, setErrorMessage] = useState('')
    const [localUser, setLocalUser] = useState({
        _id: '',
        name:'' ,
        email: '',
        password: '',
        wordsPerMinute: '',
        profileImage: '',
        following: [],
        followers: [],
        level: '',
    })

    // Set Initial Data
    useEffect(() => {
        if (user) {
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
            dispatch(updateUser({ profileImage: reader.result }, setErrorMessage))
        })
        reader.readAsDataURL(e.target.files[0])
    }

    const handleUpdateUserCred = () => {
        // dispatch(updateUser({ ...user, ...formData}, setErrorMessage))
        dispatch(updateUser({ ...formData}, setErrorMessage))
    }

    const handleSignout = () => {
        dispatch(signout())
        navigate('/')
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(navigate))
    }

    // Visit another user's public profile page
    const handleClickUser = (userId) => {
        dispatch(fetchVisitedUserBooks(userId))
        dispatch(getCurrentVisitedUser(userId, navigate))
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
                        <p className="profile-name">{localUser.name}</p>
                        { <p className={`profile-level-${localUser.level}`}>Level {localUser.level}</p> }
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
                <Col xs={6}><p>Reading Speed</p></Col>
                <Col xs={6}><p className="statistics__value">{localUser.wordsPerMinute} WPM</p></Col>
            </Row>
            <Row>
                <Col xs={6}><p>Books Read</p></Col>
                <Col xs={6}><p className="statistics__value">{bookData.completedBooks.length}</p></Col>
            </Row>
            <Row>
                <Col xs={6}><p>Reviews Written</p></Col>
                <Col xs={6}><p className="statistics__value">{bookData.reviewedBooks.length}</p></Col>
            </Row>
            <Row>
                <Col xs={6}><p >Points</p></Col>
                <Col xs={6}><p className="statistics__value">{localUser.points}</p></Col>
            </Row>
            <Row>
                <Col xs={6}><p style={{cursor: 'pointer'}} onClick={() => setShowFollowing(!showFollowing)}>
                    Following
                    { showFollowing ? <FontAwesomeIcon className='following-followers-btn' icon={faMinus} /> : <FontAwesomeIcon className='following-followers-btn' icon={faPlus} /> }
                </p></Col>
                <Col xs={6}><p className="statistics__value">{localUser.following.length}</p></Col>
            </Row>
            {
                showFollowing
                &&
                <Row>
                    <Col xs={12}>
                        <Card className='following-followers'>
                            <Card.Body>
                                { localUser.following.length <= 0 && <p>Not following anybody yet {':('}</p> }
                                { 
                                    localUser.following.map((followee) => {
                                        return (
                                            <Row key={followee.id} onClick={() => handleClickUser(followee.id)}>
                                                <Col>
                                                    <p className="following-followers__name">@{followee.name} <FontAwesomeIcon icon={faAngleRight} /></p>
                                                </Col>
                                            </Row>
                                        )
                                    }) 
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            }
            <Row>
                <Col xs={6}><p style={{cursor: 'pointer'}} onClick={() => setShowFollowers(!showFollowers)}>
                    Followers
                    { showFollowers ? <FontAwesomeIcon className='following-followers-btn' icon={faMinus} /> : <FontAwesomeIcon className='following-followers-btn' icon={faPlus} /> }
                </p></Col>
                <Col xs={6}><p className="statistics__value">{localUser.followers.length}</p></Col>
            </Row>
            {
                showFollowers
                &&
                <Row>
                    <Col xs={12}>
                        <Card className='following-followers'>
                            <Card.Body>
                                { localUser.followers.length <= 0 && <p>No followers yet {':('}</p> }
                                { 
                                    localUser.followers.map((follower) => {
                                        return (
                                            <Row key={follower.id} onClick={() => handleClickUser(follower.id)}>
                                                <Col>
                                                    <p className="following-followers__name">@{follower.name} <FontAwesomeIcon icon={faAngleRight} /></p>
                                                </Col>
                                            </Row>
                                        )
                                    }) 
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            }

            {/* Invisible input clicked when profile image is clicked */}
            <Form.Control id="fileInput" style={{display: 'none'}} type="file" onChange={(e) => handleUpdateProfileImage(e)} />
        </Container>
    )
}

export default Profile
