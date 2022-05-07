import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ProgressBar}  from 'react-bootstrap'
import './DeadlinesWidget.css'

const DeadlinesWidget = () => {
    const books = useSelector((state) => state.books)

    console.log(books);

    return (
        <div className='Dashboard__card DeadlinesWidget'>
            <div>
                <h4>Upcoming Deadlines</h4>
            </div>
                {
                    books.map((book) => {
                        if(book.isCompleted === false && book.deadline !== undefined)
                        return (
                            <div className='d-flex justify-content-between'>
                                <span>{book.title}</span>
                                <span>{new Date(book.deadline).toDateString()}</span>
                            </div>
                        )
                    })
                }
        </div>
    )
}

export default DeadlinesWidget