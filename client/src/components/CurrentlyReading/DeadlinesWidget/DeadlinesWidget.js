import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ProgressBar}  from 'react-bootstrap'
import './DeadlinesWidget.css'
import moment from 'moment'

const DeadlinesWidget = () => {
    const books = useSelector((state) => state.books)

    return (
        <div className='Dashboard__card DeadlinesWidget'>
            <div>
                <h4>Upcoming Deadlines</h4>
            </div>
            <div>
                {
                    books.map((book) => {
                        if(book.isCompleted === false && book.deadline !== undefined)
                        return (
                            <div className='d-flex justify-content-between'>
                                <span style={{width: '50%'}}>{book.title}</span>
                                <span>{moment(book.deadline).format('MMM Do')}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DeadlinesWidget