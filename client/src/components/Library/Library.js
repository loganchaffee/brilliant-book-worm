import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';

import LibraryBook from './LibraryBook/LibraryBook';
import LibraryRow from './LibraryRow/LibraryRow';
import './Library.css'

import { getBooks } from '../../actions/books';
import { setCurrentBook } from '../../actions/currentBook';

function Library() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books)
    const [viewAsRow, setViewAsRow] = useState(false);

    useEffect(() => {
        dispatch(getBooks())
    }, [])

    return (
        <Container className="Library">
            <Row>
                <Col xs={6}>
                    <h4 style={{ paddingLeft: '0' }}>Library</h4>
                </Col>
                <Col xs={6} className="Library__toggle-btn-container">
                    <Button variant='outline-secondary' size="sm" onClick={() => setViewAsRow(!viewAsRow)}>{viewAsRow ? 'View as Bookshelf' : 'View as Row'}</Button>
                </Col>
            </Row>
            {
                viewAsRow
                ?
                <Row>
                    {books.map((book, index) => {
                        const color = "var(--bs-info)"
                        if (book.isCompleted) {
                            return (
                                <Col xs={12} key={book.title + index}>
                                    <Link to={`/library-form?id=${book._id}`} onClick={() => dispatch(setCurrentBook(book))} style={{width: 'fit-content', height: 'fit-content', padding: '0'}}>
                                        <LibraryRow
                                            title={book.title}
                                            author={book.author}
                                        />
                                    </Link>
                                </Col>
                            )
                        }
                    })}
                </Row>
                :
                <Row >
                    <Col xs={12} className='Library__books-container'>
                        {books.map((book, index) => {
                            const color = "var(--bs-info)"
                            if (book.isCompleted) {
                                return (
                                    <Link key={book.title + index} to={`/library-form?id=${book._id}`} onClick={() => dispatch(setCurrentBook(book))} style={{width: 'fit-content', height: 'fit-content', padding: '0'}}>
                                        <LibraryBook 
                                            numberOfStars={book.numberOfStars}
                                            title={book.title}
                                            review={book.review}
                                            color={color}
                                        />
                                    </Link>
                                )
                            }
                        })}
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default Library;
