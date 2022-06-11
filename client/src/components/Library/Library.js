import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, LibraryBook, LibraryRow } from 'react-bootstrap';
import './Library.css'
import _ from 'lodash'
import { resizeLastBook } from './utils';
import { getBooks } from '../../actions/books';
import { setCurrentBook } from '../../actions/currentBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import ScrollToTopOnMount from '../common/ScrollToTopOnMount/ScrollToTopOnMount';

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
            <ScrollToTopOnMount />
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
                                            {
                                                book.thumbnail
                                                ?
                                                <img src={book?.thumbnail} className='Library__book-image' />
                                                :
                                                <div className='Library__book-alternate'>
                                                    <FontAwesomeIcon icon={faBook}/>
                                                    <p>{book?.title}</p>
                                                    <p>{book?.subtitle}</p>
                                                </div>
                                            }
                                        </Link>
                                    </Col>
                                )
                            }
                        })
                    }
                </Row>
                :
                <div className='Library__alternate-content'>
                    <h3 style={{color: 'var(--secondary)'}}>No completed books yet</h3>
                </div>
            }
        </div>
    )
}

export default Library;
