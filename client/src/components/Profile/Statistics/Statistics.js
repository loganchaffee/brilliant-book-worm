import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert, Card, Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClock, faPenAlt, faGamepad } from '@fortawesome/free-solid-svg-icons';
import './Statistics.css'

const Statistics = ({ user, books }) => {
    const dispatch = useDispatch()
    // const user = useSelector((state) => state.auth)
    // const books = useSelector((state) => state.books)
    const navigate = useNavigate()  
    const [bookData, setBookData] = useState({ completedBooks: [], reviewedBooks: [] }) // Capitalized Name

    useEffect(() => {
        if (books.length > 0) {
            const completedBooks = books.filter((book) => book.isCompleted)
            const reviewedBooks = books.filter((book) => book.review)
            setBookData({ ...bookData, completedBooks: completedBooks, reviewedBooks: reviewedBooks })
        }
    }, [user])

    return <div className='Statistics box-shadow'>
        <h3>Statistics</h3>
        <Row>
            <Col xs={8}><p><FontAwesomeIcon color={'var(--success)'} icon={faClock} /> Reading Speed</p></Col>
            <Col xs={4}><p className="statistics__value">{user.wordsPerMinute} WPM</p></Col>
        </Row>
        <Row>
            <Col xs={8}><p><FontAwesomeIcon color={'var(--warning)'} icon={faBook} /> Books Read</p></Col>
            <Col xs={4}><p className="statistics__value">{bookData.completedBooks.length}</p></Col>
        </Row>
        <Row>
            <Col xs={8}><p><FontAwesomeIcon color={'var(--danger)'} icon={faPenAlt} /> Reviews Written</p></Col>
            <Col xs={4}><p className="statistics__value">{bookData.reviewedBooks.length}</p></Col>
        </Row>
        <Row>
            <Col xs={8}><p><FontAwesomeIcon color={'var(--primary)'} icon={faGamepad} /> Points</p></Col>
            <Col xs={4}><p className="statistics__value">{user.points}</p></Col>
        </Row>
    </div>
}

export default Statistics