import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../actions/books';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import CurrentlyReadingCard from './CurrentlyReadingCard/CurrentlyReadingCard';
import './CurrentlyReading.css'

import { setCurrentBook } from '../../actions/currentBook';
import { updateUser } from '../../actions/auth';


function CurrentlyReading() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books)
    
    useEffect(() => {
        dispatch(getBooks())
    }, [])

    return (
        <Container className="CurrentlyReading">
            <Row>
                <Col xs={12}>
                    <h4 style={{ paddingLeft: '0' }}>Currently Reading</h4>
                </Col>
            </Row>
            <Row>
                <Link to="/add-book">
                    <Button className='add-new-book-btn full-width-btn'><Icon icon={faPlus} /> Add New Book</Button>
                </Link>
            </Row>
            <Row>
                <Col xs={12}>
                    {
                        books.map((book) => {
                            if (!book.isCompleted) {
                                return <Link to={`/edit-book?id=${book._id}`} key={book._id} onClick={() => dispatch(setCurrentBook(book))}>
                                    <CurrentlyReadingCard book={book} />
                                </Link>
                            }
                        })
                    }
                </Col>
            </Row>
            
        </Container>
    );
}

export default CurrentlyReading;
