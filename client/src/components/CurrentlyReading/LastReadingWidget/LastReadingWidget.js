import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ProgressBar}  from 'react-bootstrap'
import { timeSince } from './utils';
import './LastReadingWidget.css'
import moment from 'moment'

const LastReadingWidget = () => {
    const user = useSelector((state) => state.auth)

    const [lastReading, setLastReading] = useState(0)


    const updateWidget = () => {
        let a = moment()
        let b = moment(user.dateOfLastReading)

        let diff = { num: a.diff(b, 'days'), unit: 'Day'};
        if (diff.num < 1) {
            diff =  { num: a.diff(b, 'hours'), unit: 'Hour'};
            console.log(diff);
            if (diff.num < 1) {
                diff = { num: a.diff(b, 'minutes'), unit: 'Minute'};
            }
        }

        setLastReading(diff)
    }

    useEffect(() => {
        updateWidget()
    }, [user.dateOfLastReading])

    return (
        <div className='Dashboard__card LastReadingWidget'>
            <div>
                <h4>Last Reading</h4>
            </div>

            <div className='d-flex justify-content-between'>
                <span>{lastReading.num}{' '}{lastReading.unit}{lastReading.num !== 1 && 's'} Ago</span>
                <span>{moment(user.dateOfLastReading).format('MMM Do')}</span>
            </div>
        </div>
    )
}

export default LastReadingWidget