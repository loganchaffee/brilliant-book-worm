import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, LibraryBook, LibraryRow } from 'react-bootstrap';
import './Library.css'
import _ from 'lodash'
import { resizeLastBook } from './utils';
import { getBooks } from '../../actions/books';
import { setCurrentBook } from '../../actions/currentBook';

function Library() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books)

    useEffect(() => {
        dispatch(getBooks())

        resizeLastBook()
        window.addEventListener('resize', _.throttle(resizeLastBook), 200)

        return () => window.removeEventListener('resize', _.throttle)
    }, [])

    useEffect(() => resizeLastBook(), [books.length])

    return (
        <div className="Library">
            <Row>
                <Col style={{padding: '0px'}}>
                    <h1 >Library</h1>
                </Col>
            </Row>
            {
                books.length > 0
                ?
                <Row className='Library__bookshelf'>
                    {
                        books.map((book, i) => {
                            if (book.isCompleted) {
                                return ( 
                                    <Col key={book._id + 'library'} className='Library__book-container' xs={4} sm={4} md={3} lg={2}>
                                        <Link 
                                            to={`/library-form/${book._id}`} 
                                            onClick={() => dispatch(setCurrentBook(book))} 
                                            className='Library__book-link' 
                                        >
                                            <img src={book.thumbnail} className='Library__book-image' />
                                        </Link>
                                    </Col>
                                )
                            }
                        })
                    }
                </Row>
                :
                <h3 style={{color: 'var(--secondary)'}}>No completed books yet</h3>
            }
        </div>
    )
}

export default Library;
