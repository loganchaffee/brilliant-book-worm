import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ProgressBar}  from 'react-bootstrap'
import './DeadlinesWidget.css'
import moment from 'moment'

const DeadlinesWidget = () => {
    const books = useSelector((state) => state.books)
    const [relevantBooks, setRelevantBooks] = useState([])

    useEffect(() => {
        let rb = []
        for (let i = 0; i < books.length; i++) {
            const book = books[i]
            if (!book.isCompleted && book.deadline !== undefined) rb.push(book)
        }
        setRelevantBooks(rb)
    }, [books])

    return (
        <div className='Dashboard__card DeadlinesWidget'>
            <div>
                <h4>Upcoming Deadlines</h4>
            </div>
            <div>
                {
                    relevantBooks.map((book) => <div className='d-flex justify-content-between' key={'deadline-' + book._id}>
                            <span style={{width: '50%'}}>{book.title}</span>
                            <span>{moment(book.deadline).format('MMM Do')}</span>
                        </div>
                    )
                }
                {
                    relevantBooks.length === 0
                    &&
                    <span>No current deadlines</span>
                }
            </div>
        </div>
    )
}

export default DeadlinesWidget