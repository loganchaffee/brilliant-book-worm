import React, { useState } from 'react'
import SuggestSpeedTest from './SuggestSpeedTest'
import SpeedTestResults from './SpeedTestResults'
import SpeedTest from '../../Challenge/ReadingSpeedTest/SpeedTest/SpeedTest'
import './InitialSpeedTest.css'

const InitialSpeedTest = ({ setCurrentPage, currentPage }) => {
    const [step, setStep] = useState(0)

    return <div>
        {step === 0 && <div className='animate-up-and-in'><SuggestSpeedTest step={step} setStep={setStep} currentPage={currentPage} setCurrentPage={setCurrentPage} /></div>}
        {step === 1 && <div className='animate-up-and-in'><SpeedTest isInWelcomeModal={true} step={step} setStep={setStep} /></div>}
        {step === 2 && <div className='animate-up-and-in'><SpeedTestResults step={step} setStep={setStep} currentPage={currentPage} setCurrentPage={setCurrentPage} /></div>}
    </div>
}

export default InitialSpeedTest