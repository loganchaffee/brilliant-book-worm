import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import './WelcomePage.css'

const WelcomePage = ({ currentPage, setCurrentPage }) => {
    const user = useSelector((state) => state.auth)

    return <div className='WelcomePage animate-up-and-in'>
        <h2>Welcome to Bookworm, {user.name.split(' ')[0]}</h2>
        <Button className='WelcomePage__button' onClick={() => setCurrentPage(currentPage + 1)}>Get Started</Button>
    </div>
}

export default WelcomePage