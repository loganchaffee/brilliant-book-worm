import React, { useEffect } from 'react'
import UserDetails from '../../Profile/UserDetails/UserDetails'
import { Button } from 'react-bootstrap'

const FinishProfileSetup = ({ setCurrentPage, currentPage}) => {
    useEffect(() => {
        document.getElementsByClassName('profile-more-btn')[0].style.display = 'none'
    }, [])

    return <div>
        <h3>Finish setting up your profile</h3>
        <UserDetails />
        <div className='d-flex justify-content-between'>
            <span className='full-width-btn'/>
            <Button className='full-width-btn' onClick={() => setCurrentPage(currentPage + 1)}>Continue</Button>
        </div>
    </div>
}

export default FinishProfileSetup