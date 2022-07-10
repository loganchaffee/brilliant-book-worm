import React from 'react'
import './StopWatch.css'

const StopWatch = () => {
    return (
        <div className='StopWatch-container'>
            <div className='top-button'>
                <div className='top-head'></div>
                <div className='top-pin'></div>
                <div className='top-ring'></div>
            </div>
            <div className='side-button'>
                <div className='side-head'></div>
                <div className='side-pin'></div>
            </div>
            <div className='StopWatch'>
                
                <div className='tick-container tick-container-1'><div className='tick tick-1' /></div>
                <div className='tick-container tick-container-2'><div className='tick tick-2' /></div>
                <div className='tick-container tick-container-3'><div className='tick tick-3' /></div>
                <div className='tick-container tick-container-4'><div className='tick tick-4' /></div>
                <div className='tick-container tick-container-5'><div className='tick tick-5' /></div>
                <div className='tick-container tick-container-6'><div className='tick tick-6' /></div>
                <div className='tick-container tick-container-7'><div className='tick tick-7' /></div>
                <div className='tick-container tick-container-8'><div className='tick tick-8' /></div>
                <div className='tick-container tick-container-9'><div className='tick tick-9' /></div>
                <div className='tick-container tick-container-10'><div className='tick tick-10' /></div>
                <div className='tick-container tick-container-11'><div className='tick tick-11' /></div>
                <div className='tick-container tick-container-12'><div className='tick tick-12' /></div>
                <div className='hand-container'><div className='hand' /></div>
                <div className='center-knob'></div>
            </div>
        </div>
        
    )
}

export default StopWatch