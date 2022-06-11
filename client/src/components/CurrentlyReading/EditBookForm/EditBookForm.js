import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook, deleteBook } from '../../../actions/books';
import { updateUser } from '../../../actions/auth';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { setCurrentBook } from '../../../actions/currentBook';
import BackButton from '../../common/BackButton/BackButton';
import moment from 'moment'
import './EditBookForm.css'
import useAddPoints from '../../../hooks/use-add-points'

function EditBookForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const currentBook = useSelector((state) => state.currentBook)
    const books = useSelector((state) => state.books)
    const user = useSelector((state) => state.auth)
    const addPoints = useAddPoints()

    const [formData, setFormData] = useState({ title: '', subtitle: '', author: '', publicationDate: '', numberOfPages: 0, currentPage: 60 })
    const [previousCurrentPage, setPreviousCurrentPage] = useState(null)
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

    // Reset the current book on page reload
    useEffect(() => {
        if (!currentBook._id) {
            const index = books.findIndex((book) => book._id === params.id)
            dispatch(setCurrentBook(books[index]))
        }
    }, [currentBook._id])

    // Set form data and old current page
    useEffect(() => {
        setPreviousCurrentPage(currentBook.currentPage)
        setFormData({ ...currentBook })
    }, [currentBook._id])

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault()
        // Did user read this update?
        if (previousCurrentPage < formData.currentPage) {
            dispatch(updateUser({ dateOfLastReading: new Date().toISOString() }))
            addPoints(5)
        }

        dispatch(updateBook(currentBook._id, formData))
        navigate('/')
    }

    // Sets page count to 
    const handleCompleteBook = (e) => {
        e.preventDefault()
        // Check if deadline was met
        const currentTime = new Date().getTime()
        const deadlineTime = new Date(currentBook.deadline).getTime()

        if (currentTime < deadlineTime) {
            addPoints(150)
        } else {
            addPoints(100)
        }

        dispatch(updateBook(currentBook._id, { ...formData, isCompleted: true, currentPage: formData.numberOfPages }))
        navigate('/')
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteBook(currentBook._id))
        navigate('/')
    }

    const handleToggleDeleteBtn = () => setShowDeleteBtn(!showDeleteBtn)

    return (
        <Container className='EditBookForm'>
            <Row>
                <Col xs={12} className='d-flex justify-content-between align-items-center EditBookForm__top-row'>
                    <BackButton />
                    <div className='EditBookForm__top-row__right-side'>
                        { showDeleteBtn && <Button variant='danger' className='EditBookForm__delete-book-btn' onClick={handleDelete}>Delete Book?</Button> }
                        <FontAwesomeIcon className='more-btn' icon={faEllipsisH} onClick={handleToggleDeleteBtn} />
                    </div>
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
                            <Form.Control type="name" placeholder="Book Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="name" placeholder="Subtitle" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="name" placeholder="Author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 date-of-publication-form-group d-flex justify-content-between flex-wrap">
                            <Form.Label style={{ width: 'calc(50% - 5px)'}} className="short-form-label">Publication Date:</Form.Label>
                            <Form.Label style={{ width: 'calc(50% - 5px)'}} className="short-form-label">Number of Pages:</Form.Label>
                            <Form.Control type="text" className="short-form-input" placeholder='Publication Date' value={formData.publicationDate} onChange={(e) => setFormData({...formData, publicationDate: e.target.value})}/>
                            <Form.Control className="short-form-input" type="number" placeholder='Number of Page' value={formData.numberOfPages} onChange={(e) => setFormData({...formData, numberOfPages: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 date-of-publication-form-group d-flex justify-content-between flex-wrap">
                            <Form.Label style={{ width: 'calc(50% - 5px)'}} className="short-form-label">Current Page:</Form.Label>
                            <Form.Label style={{ width: 'calc(50% - 5px)'}} className="short-form-label">Deadline:</Form.Label>
                            <Form.Control className="short-form-input" type="number" value={formData.currentPage} onChange={(e) => setFormData({...formData, currentPage: e.target.value})}/>
                            <Form.Control disabled className="short-form-input" value={ currentBook.deadline ? moment(currentBook.deadline).format('MMM Do') : 'None' } />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className='EditBookForm__bottom-row'>
                    <Button variant="success" className='full-width-btn' onClick={handleCompleteBook}>Complete Book</Button>
                    <Button variant="primary" className='full-width-btn' onClick={handleSubmit}>Update Book Details</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default EditBookForm;
