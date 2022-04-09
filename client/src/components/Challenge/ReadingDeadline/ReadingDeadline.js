import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

import Calendar from 'react-calendar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faLeaf } from '@fortawesome/free-solid-svg-icons'

import { getBooks, updateBook } from '../../../actions/books'
import { setCurrentBook } from '../../../actions/currentBook';

import 'react-calendar/dist/Calendar.css';
import './ReadingDeadline.css';

const ReadingDeadline = () => {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books)
    
    const [calendarValue, setCalendarValue] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        dispatch(getBooks())
    }, [])
 
    useEffect(() => {
        setSelectedBook(books.filter((book) => book._id === selectedBookId)[0])
    }, [selectedBookId])


    const handleSubmit = () => {

        if (selectedBookId && calendarValue) {
            const deadline = calendarValue
            dispatch(updateBook(selectedBookId, { ...selectedBook, deadline: deadline }, setAlertMessage))
        }
    }

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Link to="/challenge" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3>Reading Deadline</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="mb-3 main-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Select Book</Form.Label>
                            <Form.Select aria-label="Default select example" value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
                                <option value={null} />
                                {
                                    books.map((book, index) => {
                                        if (!book.isCompleted && !book.deadline) {
                                            return <option key={index + book._id} value={book._id}>{book.title}</option>
                                        }
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                       
                        <Form.Group>
                            <Form.Label>Select Deadline</Form.Label>
                            <Calendar className='ReadingDeadline__calendar' calendarType="US" minDate={new Date()} onChange={setCalendarValue} value={calendarValue} />
                        </Form.Group>
                    </Form>
                    <Button className="full-width-btn" onClick={handleSubmit}>Set Deadline</Button>
                    { alertMessage && <Alert variant='success'>{alertMessage}</Alert> }
                </Col>
            </Row>
        </Container>
    )
}

export default ReadingDeadline

