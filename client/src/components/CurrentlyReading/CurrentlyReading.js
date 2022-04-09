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
    const user = useSelector((state) => state.auth)

    const [pagesPerMinute, setPagesPerMinute] = useState(0)

    useEffect(() => dispatch(getBooks()), [])
    useLayoutEffect(() => setPagesPerMinute(user.wordsPerMinute / 275), [])

    // Temporary vars
    console.log();
    
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
                                let num = Math.round((book.numberOfPages - book.currentPage) / pagesPerMinute, 10);
                                let hours = (num / 60);
                                let rhours = Math.floor(hours);
                                let minutes = (hours - rhours) * 60;
                                let rminutes = Math.round(minutes);

                                return <Link to={`/edit-book?id=${book._id}`} key={book._id} onClick={() => dispatch(setCurrentBook(book))}>
                                    <CurrentlyReadingCard
                                        title={book.title}
                                        author={book.author}
                                        completionTime={`${rhours}h ${rminutes}m`}
                                        currentPage={book.currentPage}
                                        numberOfPages={book.numberOfPages}
                                        progress={book.currentPage / book.numberOfPages * 100}
                                    />
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
