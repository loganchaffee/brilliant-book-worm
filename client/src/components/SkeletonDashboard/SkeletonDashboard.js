import React from 'react'
import { Spinner } from 'react-bootstrap'
import './SkeletonDashboard.css'

const SkeletonDashboard = () => {
    return <div id='App'>
        <div className='Sidebar skeleton-loading'/>
        <div className='TopNavbar skeleton-loading' />
        <div className='BottomNavbar skeleton-loading' />

        <div className="main-container" xs={12}>
            <div className='main-content'>
                <div className='skeleton-loading skeleton-title' />
                <div className='skeleton-loading skeleton-subtitle' />
                
                <div className='d-flex justify-content-center align-items-center loading-spinner-container'>
                    <Spinner animation='border' variant='custom' />
                </div>
            </div>
        </div>
    </div>
}

export default SkeletonDashboard