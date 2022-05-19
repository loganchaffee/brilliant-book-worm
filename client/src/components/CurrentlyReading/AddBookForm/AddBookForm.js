import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { searchBooks } from '../../../api/google-books';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faBook } from '@fortawesome/free-solid-svg-icons'
import './AddBookForm.css'
import { createBook } from '../../../actions/books';
import { updateUser } from '../../../actions/auth';
import axios from 'axios';
import { defaultFormDataState } from './default-form-data-state';

import './AddBookForm.css'

function AddBookForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)

    const [googleBooks, setGoogleBooks] = useState([])
    const [pickedBook, setPickedBook] = useState(false)
    const [formData, setFormData] = useState(defaultFormDataState)


    // TODO update to use lodash
    const [timeoutId, setTimeoutId] = useState(0)
    useEffect(() => {
        clearTimeout(timeoutId)
        const id = setTimeout(handleSearch, 200)
        setTimeoutId(id)
    }, [formData.title])

    useEffect(() => {

        document.addEventListener('click', (e) => {
            if (e.target.id != 'titleInput' || e.target.id != 'titleInput') {
                setGoogleBooks([])
            }
        })

        return () => document.removeEventListener('click')
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createBook({ ...formData, createdBy: user._id})) // Create Book
        dispatch(updateUser({ points: user.points + 5 })) // Update User points
        navigate('/')
    }

    const handleSearch = async () => {
        try {
            if (formData.title === '') {
                setGoogleBooks([])
                setFormData({ ...formData, thumbnail: ''})
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
        <div className='AddBookForm'>
            <Row>
                <Col xs={6} className='d-flex align-items-between flex-column'>
                    <Link to="/" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <h3 className='mb-0'>Add Book</h3>
                </Col>
                <Col className='AddBookForm__thumbnail-container'>
                    {
                        formData.thumbnail
                        ?
                        <img src={formData.thumbnail} className='AddBookForm__thumbnail'/>
                        :
                        <FontAwesomeIcon icon={faBook} className='AddBookForm__thumbnail-icon'/>
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form className={ googleBooks.length <= 0 ? 'mb-3 mt-1 main-form' : 'mb-3 mt-1 main-form' }>
                        <Form.Group className="mb-3">
                            {/* <Form.Label>Title</Form.Label> */}
                            <Form.Control 
                                id='titleInput'
                                className={ googleBooks.length > 0 ? 'no-bottom-border-radius' : '' }
                                type="name" 
                                placeholder="Book Title" 
                                value={formData.title} 
                                onChange={(e) => {
                                    setPickedBook(false)
                                    setFormData({...formData, title: e.target.value})}
                                }
                                onClick={handleSearch}
                            />
                            {
                                googleBooks.length > 0 && !pickedBook
                                ?
                                <div className='AddBookForm__results' id='titleResults'>
                                    { 
                                        googleBooks.map((book, i) => {
                                            console.log(book);
                                            if (i > 4) return
                                            return (
                                                <div 
                                                    className='d-flex justify-content-start align-items-start pb-1 AddBookForm__result' 
                                                    onClick={() => handleFillForm(book)}
                                                >
                                                    <img width='50' src={book?.imageLinks?.thumbnail} style={{marginRight: '10px'}}/>
                                                    <div style={{width: '100%'}}>
                                                        <p className='mb-0'>{book.title}</p>
                                                        <p style={{fontSize: '12px'}}>{book.subtitle}</p>
                                                    </div>
                                                </div>
                                            )
                                        }) 
                                    }
                                </div>
                                :
                                undefined
                            }
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            {/* <Form.Label>Subtitle</Form.Label> */}
                            <Form.Control type="name" placeholder="Subtitle" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {/* <Form.Label>Author</Form.Label> */}
                            <Form.Control type="name" placeholder="Author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 date-of-publication-form-group d-flex justify-content-between flex-wrap">
                            <Form.Label style={{ width: 'calc(50% - 5px)' }} className="short-form-label">Publication Date:</Form.Label>
                            <Form.Label style={{ width: 'calc(50% - 5px)' }} className="short-form-label">Number of Pages:</Form.Label>
                            <Form.Control type="text" className="short-form-input" placeholder='Publication Date' value={formData.publicationDate} onChange={(e) => setFormData({...formData, publicationDate: e.target.value})}/>
                            <Form.Control className="short-form-input" type="number" placeholder='Number of Page' value={formData.numberOfPages} onChange={(e) => setFormData({...formData, numberOfPages: e.target.value})}/>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button className='full-width-btn' onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </div>
    );
}

export default AddBookForm;
