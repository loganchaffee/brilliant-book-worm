import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook, deleteBook } from '../../../actions/books';
import { updateUser } from '../../../actions/auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faEllipsisH, faStar } from '@fortawesome/free-solid-svg-icons'
import { setCurrentBook } from '../../../actions/currentBook';
import useAddPoints from '../../../hooks/use-add-points';
import './LibraryForm.css'

const LibraryBookForm = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentBook = useSelector((state) => state.currentBook)
    const books = useSelector((state) => state.books)
    const user = useSelector((state) => state.auth)
    const starArray = new Array(5).fill('')
    const addPoints = useAddPoints()

    const [reviewWasEmpty, setReviewWasEmpty] = useState(true)
    const [formData, setFormData] = useState({
        numberOfStars: 4,
        review: ''
    })

    useEffect(() => {
        if (!currentBook._id) {
            const index = books.findIndex((book) => book._id === params.id)
            dispatch(setCurrentBook(books[index]))
        }

        setFormData({...currentBook})
        if (currentBook.review) {
            setReviewWasEmpty(false)
        }
    }, [])

    useEffect(() => setFormData({...currentBook}), [currentBook._id])

    const handleStarClick = (index) => {
        setFormData({...formData, numberOfStars: index + 1})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (reviewWasEmpty) {
            addPoints(50)
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
                    <Link to={`/edit-book/${currentBook._id}`} className='ellipsis-btn'>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3 className='LibraryForm__title'>{currentBook.title}</h3>
                    <p className="LibraryForm__subtitle">By {currentBook.author}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-10">
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
                        <Form.Group className="mb-10">
                            <p className="LibraryForm__section-title">Your Review</p>
                            <Form.Control 
                                as="textarea" 
                                placeholder="Type your review here. What did you think?" 
                                className="LibraryForm__textarea"
                                value={formData.review} 
                                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-10 d-flex justify-content-end">
                            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LibraryBookForm;
