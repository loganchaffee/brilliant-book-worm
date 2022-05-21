import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ProgressBar}  from 'react-bootstrap'
import './LevelUp.css'

const LevelUp = () => {
    const user = useSelector((state) => state.auth)

    const [nextLevelPoints, setNextLevelPoints] = useState('')
    const [previousLevelPoints, setPreviousLevelPoints] = useState('')

    useEffect(() => {
        if (user.points < 1000) {
            setNextLevelPoints(1000)
            setPreviousLevelPoints(0)
        } else if (user.points <= 2500) {
            setNextLevelPoints(2500)
            setPreviousLevelPoints(1000)
        } else if (user.points < 5000) {
            setNextLevelPoints(5000)
            setPreviousLevelPoints(2500)
        }
    }, [user.points])

    console.log();

    return (
        <div className='Dashboard__level Dashboard__card'>
            <div>
                <h4 className='Dashboard__level__level'>Level Up</h4>
            </div>
            <div className='d-flex justify-content-between'>
                <span className='Dashboard__level__level'>Current Level: </span>
                <span className={`level-${user.level}-icon`}>LEVEL {user.level}</span>
            </div>
            <div className='d-flex justify-content-between'>
                <span>Total Points:</span>
                <span>{user.points}</span>
            </div>
            <div className='d-flex justify-content-between'>
                <span>Next Level At:</span>
                <span>{nextLevelPoints} Points</span>
            </div>
            <ProgressBar variant='warning' now={((user.points - previousLevelPoints) / (nextLevelPoints - previousLevelPoints)) * 100} />
        </div>
    )
}

export default LevelUp