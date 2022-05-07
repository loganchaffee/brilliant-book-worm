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


function CurrentlyReading() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books)
    const user = useSelector((state) => state.auth)
    
    useEffect(() => {
        dispatch(getBooks())
    }, [])

    return (
        <div className='CurrentlyReading'>
            <Row>
                <Col xs={12} className='page-heading'>
                    <h3>Dashboard</h3>
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
                <Col lg={6} >
                    <Row>
                        <Col xs={12} className='d-flex justify-content-between'>
                            <h4>Currently Reading</h4>
                            <Link to="/add-book">
                                <Button className='add-new-book-btn full-width-btn'><Icon icon={faPlus} /> Add New Book</Button>
                            </Link>
                        </Col>
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
                </Col>
                <Col lg={6} >
                    <Row>
                        <Col xs={12} className='d-flex justify-content-between'>
                            <h4>Most Recent Post</h4>
                        </Col>
                        <Col xs={12}>
                            Users Newest Post Here
                        </Col>
                    </Row>
                </Col>
            </Row>

            
            
        </div>
    );
}

export default CurrentlyReading;
