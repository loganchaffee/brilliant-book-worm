import React, {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert, Card, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { signout, deleteUser, updateUser, follow } from '../../actions/auth'
import { getCurrentVisitedUser,  } from '../../actions/currentVisitedUser';
import { fetchVisitedUserBooks } from '../../actions/currentVisitedUserBooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Profile.css'
import UserDetails from './UserDetails/UserDetails';
import FollowersSection from './FollowersSection/FollowersSection';
import Statistics from './Statistics/Statistics';
import ScrollToTopOnMount from '../common/ScrollToTopOnMount/ScrollToTopOnMount'

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

    const [showModal, setShowModal] = useState(false)
    const [cropper, setCropper] = useState(null)
    const [image, setImage] =  useState('')


    // Set Initial Data----------------------------------------------------------------------
    useEffect(() => {
        if (user) {
            setFormData({ ...formData, name: user.name, email: user.email })
        }
        if (books) {
            const completedBooks = books.filter((book) => book.isCompleted)
            const reviewedBooks = books.filter((book) => book.review)
            setBookData({ ...bookData, completedBooks: completedBooks, reviewedBooks: reviewedBooks })
        }
    }, [user])

    const handleDeleteUser = () => {
        dispatch(deleteUser(navigate))
    }

    // Visit another user's public profile page
    const handleClickUser = (userId) => {
        dispatch(fetchVisitedUserBooks(userId))
        dispatch(getCurrentVisitedUser(userId))
    }
        
    return (
        <div className="Profile">
            <ScrollToTopOnMount />
            <Row>
                <Col xs={12}>
                    <h4>Account Settings</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={8}>
                    <UserDetails />
                </Col>
                <Col xs={12} md={4}>
                    <FollowersSection title='Social' user={user} />
                    <Statistics user={user} books={books} />
                </Col>
            </Row>
        </div>
    )
}

export default Profile
