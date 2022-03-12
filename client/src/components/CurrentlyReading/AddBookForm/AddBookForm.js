import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import './AddBookForm.css'
import { createBook } from '../../../actions/books';
import { updateUser } from '../../../actions/auth';

function AddBookForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publicationDate: '',
        numberOfPages: 0,
        currentPage: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createBook({ ...formData, createdBy: user._id}))
        dispatch(updateUser({ ...user, points: user.points + 5 }))
        navigate('/')
    }

    return (
        <Container className='AddBookForm'>
            <Row>
                <Col xs={12}>
                    <Link to="/" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3>Add Book</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form className="mb-3 main-form">
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
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button variant='outline-primary' className='full-width-btn' onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AddBookForm;
