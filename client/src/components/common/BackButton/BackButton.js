import React, { useEffect } from 'react'
import { unstable_HistoryRouter, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const BackButton = (props) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        // Link to "/" if previous page was not from within this website
        if (location.key === 'default') return navigate('/')
        // Link to previous page
        navigate(-1)
    }

    return  <span className='back-arrow' onClick={handleClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
    </span>
}

export default BackButton