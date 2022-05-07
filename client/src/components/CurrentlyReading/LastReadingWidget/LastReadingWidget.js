import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ProgressBar}  from 'react-bootstrap'
import { timeSince } from './utils';
import './LastReadingWidget.css'

const LastReadingWidget = () => {
    const user = useSelector((state) => state.auth)

    const [lastReading, setLastReading] = useState(0)

    useEffect(() => setLastReading(timeSince(new Date(user.dateOfLastReading).getTime())), [user.dateOfLastReading])

    return (
        <div className='Dashboard__card LastReadingWidget'>
            <div>
                <h4>Last Reading</h4>
            </div>

            <div className='d-flex justify-content-between'>
                <span>{lastReading} Ago</span>
                <span>{new Date(user.dateOfLastReading).toDateString()}</span>
            </div>
        </div>
    )
}

export default LastReadingWidget