import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ProgressBar}  from 'react-bootstrap'
import { timeSince } from './utils';
import './LastReadingWidget.css'
import moment from 'moment'

const LastReadingWidget = () => {
    const user = useSelector((state) => state.auth)

    const [lastReading, setLastReading] = useState(0)

    useEffect(() => {
        let a = moment()
        let b = moment(user.dateOfLastReading)
        setLastReading(a.diff(b, 'days'))
    }, [user.dateOfLastReading])

    return (
        <div className='Dashboard__card LastReadingWidget'>
            <div>
                <h4>Last Reading</h4>
            </div>

            <div className='d-flex justify-content-between'>
                <span>{lastReading} {lastReading > 1 ? 'days': 'day'} Ago</span>
                <span>{moment(user.dateOfLastReading).format('MMM Do')}</span>
            </div>
        </div>
    )
}

export default LastReadingWidget