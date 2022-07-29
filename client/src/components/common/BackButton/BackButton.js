import React, { useEffect } from 'react'
import { unstable_HistoryRouter, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import './BackButton.css'

const BackButton = ({ content, overrideURL }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        if (overrideURL) return navigate(overrideURL)
        // Link to "/" if previous page was not from within this website
        if (location.key === 'default') return navigate('/')
        // Link to previous page
        navigate(-1)
    }

    return  <span className='BackButton d-flex' onClick={handleClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
        { content ? <span>{content}</span> : <span>Back</span> }
    </span>
}

export default BackButton