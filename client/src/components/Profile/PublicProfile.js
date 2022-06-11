import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Container, Row, Card, Form, Button, Spinner, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faMinus, faStar, faAngleRight, faPastafarianism } from '@fortawesome/free-solid-svg-icons'
import { signout, deleteUser, updateUser, follow, unfollow } from '../../actions/auth'
import { getCurrentVisitedUser, resetVisitedUser } from '../../actions/currentVisitedUser'
import { fetchVisitedUserBooks } from '../../actions/currentVisitedUserBooks'
import Statistics from './Statistics/Statistics'
import FollowersSection from './FollowersSection/FollowersSection'
import PublicProfileModal from './PublicProfileModal/PublicProfileModal'
import './PublicProfile.css'
import ScrollToTopOnMount from '../common/ScrollToTopOnMount/ScrollToTopOnMount'

const PublicProfile = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    const visitedUser = useSelector((state) => state.currentVisitedUser)
    const visitedUserBooks = useSelector((state) => state.currentVisitedUserBookData)

    const [selectedBook, setSelectedBook] = useState(null)
    const [showModalReview, setShowModalReview] = useState(false)
    const [hasCurrentlyReading, setHasCurrentlyReading] = useState(false)
    const [hasLibrary, setHasLibrary] = useState(false)
    const [path, setPath] = useState('')

    useEffect(() => {
        dispatch(getCurrentVisitedUser(params.id))
        dispatch(fetchVisitedUserBooks(params.id))

        return () => dispatch(resetVisitedUser())
    }, [params.id])

    useEffect(() => {
        for (let i = 0; i < visitedUserBooks.length; i++) {
            const book = visitedUserBooks[i];
            if (!book.isCompleted) {
                setHasCurrentlyReading(true)
            }
            if (book.isCompleted) {
                setHasLibrary(true)
            }
        }
    }, [visitedUserBooks])

    const handleFollow = () => dispatch(follow(visitedUser._id, visitedUser.name))

    const handleUnfollow = () =>  dispatch(unfollow(visitedUser._id, visitedUser.name))
    
    const handleSelectBook = (book) => {
        setSelectedBook(book)
    }

    const handleCloseModal = () => {
        setSelectedBook(null)
        setShowModalReview(false)
    }

    if (!visitedUser) {
        return <Spinner animation="border"  />
    } else {
        return (
            <div>
                <ScrollToTopOnMount />
                <Row>
                    <Col xs={12} md={8}>
                        <div className="UserDetails__credentials">
                            <div className='profile-image-container overide-zoom'>
                                {
                                    visitedUser.profileImage
                                    ?
                                    <img className='profile-image' src={visitedUser.profileImage} />
                                    :
                                    <FontAwesomeIcon icon={faUser} />
                                }
                            </div>
                            <div className='profile-name-container'>
                                <p className="profile-name">{visitedUser.name}</p>
                                { <span className={`profile-level-${visitedUser.level}`}>Level {visitedUser.level}</span> }
                            </div>
                            <div>
                                { 
                                    user.following.findIndex((followee) => followee._id === visitedUser._id) === -1
                                    ? 
                                    <Button className='follow-btn' onClick={handleFollow}><FontAwesomeIcon icon={faPlus} /> Follow</Button>
                                    :
                                    <Button className='unfollow-btn' variant='secondary' onClick={handleUnfollow}><FontAwesomeIcon icon={faMinus} /> Unfollow</Button>
                                }
                            </div>
                        </div>
                        <Row>
                            {
                                hasCurrentlyReading
                                &&
                                <div>
                                    <Col xs={12}>
                                        <p className='PublicProfile__section-title'>{visitedUser.name} Is Currently Reading</p>
                                    </Col>
                                    <div className='PublicProfile__books'>
                                        {
                                            visitedUserBooks.map((book) => {
                                                if (!book.isCompleted) return <div key={'currently-reading-' + book._id} className='PublicProfile__book' onClick={() => handleSelectBook(book)}>
                                                    <img src={book.thumbnail} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            {
                                hasCurrentlyReading
                                &&
                                <div>
                                    <Col xs={12}>
                                        <p className='PublicProfile__section-title'>{visitedUser.name}'s Library</p>
                                    </Col>
                                    <div className='PublicProfile__books'>
                                        {
                                            visitedUserBooks.map((book) => {
                                                if (book.isCompleted) return <div key={'library-' + book._id} className='PublicProfile__book' onClick={() => handleSelectBook(book)}>
                                                    <img src={book.thumbnail} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </Row>
                    </Col>
                    <Col xs={12} md={4}>
                        <FollowersSection user={visitedUser} title={`${visitedUser.name}'s Network`}/>
                        <Statistics user={visitedUser} books={visitedUserBooks} />
                    </Col>
                </Row>
                
                <PublicProfileModal
                    selectedBook={selectedBook}
                    handleCloseModal={handleCloseModal}
                    visitedUser={visitedUser}
                    showModalReview={showModalReview}
                    setShowModalReview={setShowModalReview}
                />
            </div>
        )
    }
    
}

export default PublicProfile