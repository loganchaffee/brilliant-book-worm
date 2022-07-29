import React from 'react'
import { Button } from 'react-bootstrap'
import ReadingSpeedTestResults from '../../Challenge/ReadingSpeedTest/ReadingSpeedTestResults/ReadingSpeedTestResults'

const SpeedTestResults = ({ currentPage, setCurrentPage}) => {
    return <>
        <ReadingSpeedTestResults isInWelcomeModal={true} />
        <p>
            This is what your estimated reading times will be based on. If you wish to retake this test, 
            or try again as you improve your reading speed, it will be available in the challenge section.
        </p>
        <div className='d-flex justify-content-between'>
            <span />
            <Button onClick={() => setCurrentPage(currentPage + 1)}>Continue</Button>
        </div>
    </>
}

export default SpeedTestResults