import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

import { searchBooks } from '../../../api/google-books';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import './AddBookForm.css'
import { createBook } from '../../../actions/books';
import { updateUser } from '../../../actions/auth';
import { createPost } from '../../../actions/posts';
import axios from 'axios';

function AddBookForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)

    const [googleBooks, setGoogleBooks] = useState([])
    const [pickedBook, setPickedBook] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        author: '',
        publicationDate: '',
        numberOfPages: 0,
        currentPage: 0,
        thumbnail: ''
    });
    useEffect(() => console.log(formData), [formData])

    const handleSubmit = (e) => {
        e.preventDefault()
        // Create book
        dispatch(createBook({ ...formData, createdBy: user._id}))
        // Update user's score
        dispatch(updateUser({ points: user.points + 5 }))

        navigate('/')
    }

    const handleSearch = async () => {
        try {
            if (formData.title === '') {
                setGoogleBooks([])
                return
            }

            const { data } = await searchBooks(formData.title)
            const books = []
            for (let i = 0; i < data.items.length; i++) {
                const book = data.items[i];
                books.push(book.volumeInfo)
            }
            setGoogleBooks(books)
        } catch (error) {
            console.log(error);
        }
    }

    const [timeoutId, setTimeoutId] = useState(0)
    useEffect(() => {
        clearTimeout(timeoutId)
        const id = setTimeout(handleSearch, 200)
        setTimeoutId(id)
    }, [formData.title])

    const handleFillForm = (book) => {
        setFormData({ 
            ...formData, 
            title: book?.title,
            subtitle: book?.subtitle,
            author: book?.authors[0],
            publicationDate: book?.publishedDate,
            numberOfPages: book?.pageCount,
            thumbnail: book?.imageLinks.thumbnail
        })
        setPickedBook(true)
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
                            <Form.Control 
                                type="name" 
                                placeholder="Book Title" 
                                value={formData.title} 
                                onChange={(e) => {
                                    setPickedBook(false)
                                    setFormData({...formData, title: e.target.value})}
                                }
                            />
                        </Form.Group>
                        {
                            googleBooks.length > 0 && !pickedBook
                            ?
                            <Card>
                                <Card.Body>
                                    { googleBooks.map((book, i) => (
                                        <div className='d-flex justify-content-start align-items-center mb-3' style={{cursor: 'pointer'}} onClick={() => handleFillForm(book)}>
                                            <img width='30' src={book?.imageLinks?.thumbnail} style={{marginRight: '10px'}}/>
                                            <p className='mb-0' key={book.title + i}>{book.title}<br />{book.subtitle}</p>
                                        </div>
                                    )) }
                                </Card.Body>
                            </Card>
                            :
                            undefined
                        }
                        <Form.Group className="mb-3">
                            <Form.Label>Subtitle</Form.Label>
                            <Form.Control type="name" placeholder="Subtitle" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="name" placeholder="Author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 date-of-publication-form-group">
                            <Form.Label className="short-form-label">Year of Publication:</Form.Label>
                            <Form.Control type="text" className="short-form-input" value={formData.publicationDate} onChange={(e) => setFormData({...formData, publicationDate: e.target.value})}/>
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
