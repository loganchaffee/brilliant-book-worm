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
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import './EditBookForm.css'

function EditBookForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentBook = useSelector((state) => state.currentBook)
    const books = useSelector((state) => state.books)
    const user = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publicationDate: '',
        numberOfPages: 0,
        currentPage: 60
    });

    useEffect(() => {
        setFormData({ ...currentBook })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        // Did user read this update?
        if (formData.currentPage > currentBook.currentPage) {
            const yesterday = (new Date().getDate() - 1) + '/' + new Date().getMonth()
            const today = new Date().getDate() + '/' + new Date().getMonth()

            // Did user read yesterday?
            if (user.dateOfLastReading === yesterday) {
                // User read yesterday
                dispatch(updateUser({ ...user, dateOfLastReading: today, points: user.points + 5 }))
            } else if (user.dateOfLastReading !== yesterday && user.dateOfLastReading !== today) {
                // User did not read yesterday or today
                dispatch(updateUser({ ...user, dateOfLastReading: today, points: user.points + 1 }))
            } else {
                // User already read today
                dispatch(updateUser({ ...user, dateOfLastReading: today, points: user.points }))
            }
        }

        dispatch(updateBook(currentBook._id, formData))
        navigate('/')
    }

    const handleCompleteBook = (e) => {
        e.preventDefault()

        // Does the book have a deadline
        if (currentBook.deadline) {
            // Get today
            const today = (new Date().getMonth() + 1) + '/' + (new Date().getDate())

            // Get the month and dates strings seperate
            const todaySplit = today.split('/')
            const deadlineSplit = currentBook.deadline.split('/')

            // convert month and dates strings to integers
            const todayMonth =  parseInt(todaySplit[0], 10)
            const deadlineMonth =  parseInt(deadlineSplit[0], 10)

            const todayDate =  parseInt(todaySplit[1], 10)
            const deadlineDate =  parseInt(deadlineSplit[1], 10)

            // If today's month is earlier than the deadline's month
            if (todayMonth < deadlineMonth) {
                dispatch(updateBook(currentBook._id, { ...formData, isCompleted: true, currentPage: formData.numberOfPages }))
                dispatch(updateUser({ ...user, points: user.points + 100 }))
                navigate('/')
                return
            }
            //  If today's month is equal to the deadline's month 
            //  And today's date is equal to or less than the deadline's date
            if (todayDate <= deadlineDate) {
                dispatch(updateBook(currentBook._id, { ...formData, isCompleted: true, currentPage: formData.numberOfPages }))
                dispatch(updateUser({ ...user, points: user.points + 100 }))
                navigate('/')
                return
            }

            
        } 

        dispatch(updateBook(currentBook._id, { ...formData, isCompleted: true, currentPage: formData.numberOfPages }))
        dispatch(updateUser({ ...user, points: user.points + 50 }))
        navigate('/')
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteBook(currentBook._id))
        navigate('/')
    }

    return (
        <Container className='EditBookForm'>
            <Row>
                <Col xs={12}>
                    <Link to="/" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3>Edit Book Details</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form className="main-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="name" placeholder="Book Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="name" placeholder="Author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 date-of-publication-form-group">
                            <Form.Label className="short-form-label">Date of Publication:</Form.Label>
                            <Form.Control type="date" className="short-form-input" value={formData.publicationDate} onChange={(e) => setFormData({...formData, publicationDate: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 num-of-pages-form-group">
                            <Form.Label className="short-form-label">Number of Pages:</Form.Label>
                            <Form.Control className="short-form-input" type="number" value={formData.numberOfPages} onChange={(e) => setFormData({...formData, numberOfPages: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 num-of-pages-form-group">
                            <Form.Label className="short-form-label">Current Page:</Form.Label>
                            <Form.Control className="short-form-input" type="number" value={formData.currentPage} onChange={(e) => setFormData({...formData, currentPage: e.target.value})}/>
                        </Form.Group>
                        {currentBook.deadline && <Form.Group className="mb-3 num-of-pages-form-group">
                            <Form.Label className="short-form-label">Deadline:</Form.Label>
                            <Form.Label className="short-form-label">{currentBook.deadline}</Form.Label>
                        </Form.Group>}
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button variant="outline-primary" className='full-width-btn' onClick={handleSubmit}>Update Book Details</Button>
                    <Button variant="outline-success" className='full-width-btn' onClick={handleCompleteBook}>Complete Book</Button>
                    <Button variant="outline-danger" className='full-width-btn delete-btn' onClick={handleDelete}>Delete Book</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default EditBookForm;
