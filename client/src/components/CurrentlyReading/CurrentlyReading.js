import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../actions/books';
import { Container, ProgressBar } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CurrentlyReadingCard from './CurrentlyReadingCard/CurrentlyReadingCard';
import './CurrentlyReading.css'
import { setCurrentBook } from '../../actions/currentBook';
import { updateUser } from '../../actions/auth';
import LevelUp from './LevelUp/LevelUp';
import LastReadingWidget from './LastReadingWidget/LastReadingWidget';
import DeadlinesWidget from './DeadlinesWidget/DeadlinesWidget';
import useAddPoints from '../../hooks/use-add-points';
import ScrollToTopOnMount from '../common/ScrollToTopOnMount/ScrollToTopOnMount';


function CurrentlyReading() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books)
    const user = useSelector((state) => state.auth)
    const addPoints = useAddPoints()
    
    useEffect(() => {
        dispatch(getBooks())
    }, [])

    return (
        <div className='CurrentlyReading'>
            <ScrollToTopOnMount />
            <Row>
                <Col xs={12} className='page-heading'>
                    <h1>Dashboard</h1>
                    <p>Welcome, {user.name}</p>
                </Col>
            </Row>
            <Row className='Dashboard__stats-row'>
                <Col xs={12} md={6} lg={4}>
                    <LevelUp />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <LastReadingWidget />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <DeadlinesWidget />
                </Col>
            </Row>

            <Row>
                <Col xs={12} className='d-flex justify-content-between'>
                    <h4 style={{width: 'fit-content'}}>Currently Reading</h4>
                    <Link to="/add-book" style={{marginLeft: '10px'}}>
                        <Button className='add-new-book-btn full-width-btn'><Icon icon={faPlus} /> Add New Book</Button>
                    </Link>
                </Col>
                {
                    books.length > 0
                    ?
                    books.map((book) => {
                        if (!book.isCompleted) {
                            return (
                                <Col xs={12} md={6} lg={6} className='mb-3' key={book._id}>
                                    <Link to={`/edit-book/${book._id}`} onClick={() => dispatch(setCurrentBook(book))}>
                                        <CurrentlyReadingCard book={book} />
                                    </Link>
                                </Col>
                            )
                        }
                    })
                    :
                    <div className='CurrentlyReading__alternate-content'>
                        <h3>Add a book to track your reading</h3>
                    </div>
                }
            </Row>
        </div>
    );
}

export default CurrentlyReading;
