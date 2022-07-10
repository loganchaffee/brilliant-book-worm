import React, { useState } from 'react'
import SuggestSpeedTest from './SuggestSpeedTest'
import SpeedTestResults from './SpeedTestResults'
import SpeedTest from '../../Challenge/ReadingSpeedTest/SpeedTest/SpeedTest'
import './InitialSpeedTest.css'

const InitialSpeedTest = ({ setCurrentPage, currentPage }) => {
    const [step, setStep] = useState(0)

    return <>
        {step === 0 && <SuggestSpeedTest step={step} setStep={setStep} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        {step === 1 && <SpeedTest isInWelcomeModal={true} step={step} setStep={setStep} />}
        {step === 2 && <SpeedTestResults step={step} setStep={setStep} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </>
}

export default InitialSpeedTest