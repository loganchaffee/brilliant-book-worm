import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { updateBook, deleteBook } from '../../../actions/books';
import { updateUser } from '../../../actions/auth';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faEllipsisH, faStar } from '@fortawesome/free-solid-svg-icons'

import './LibraryForm.css'

const LibraryBookForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentBook = useSelector((state) => state.currentBook)
    const user = useSelector((state) => state.auth)
    const starArray = new Array(5).fill('')

    const [reviewWasEmpty, setReviewWasEmpty] = useState(true)
    const [formData, setFormData] = useState({
        numberOfStars: 4,
        review: ''
    })

    useEffect(() => {
        setFormData({...currentBook})
        if (currentBook.review) {
            setReviewWasEmpty(false)
        }
    }, [])

    const handleStarClick = (index) => {
        setFormData({...formData, numberOfStars: index + 1})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (reviewWasEmpty) {
            dispatch(updateUser({ ...user, points: user.points + 5 }))
        }
        dispatch(updateBook(currentBook._id, formData))
        navigate('/library')
    }

    return (
        <Container className="LibraryForm">
            <Row>
                <Col xs={6}>
                    <Link to="/library" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
                <Col xs={6} className='LibraryForm__ellipsis-btn-container'>
                    <Link to="/edit-book" className='ellipsis-btn'>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3>{currentBook.title}</h3>
                    <p className="LibraryForm__subtitle">By {currentBook.author}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <p className="LibraryForm__section-title">Your Rating</p>
                            {
                                starArray.map((star, index) => {
                                    let color
                                    (index < formData.numberOfStars) ? color = 'warning' : color = 'secondary';
                                    return <FontAwesomeIcon 
                                        className="LibraryForm__star" 
                                        key={`star${index}`} 
                                        style={{color: `var(--${color})`}}
                                        icon={faStar} 
                                        onClick={() => handleStarClick(index)}
                                    />
                                })
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <p className="LibraryForm__section-title">Your Review</p>
                            <Form.Control as="textarea" placeholder="Type your review here. What did you think?" className="LibraryForm__textarea" value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button variant="outline-primary" className="full-width-btn" onClick={handleSubmit}>Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LibraryBookForm;
