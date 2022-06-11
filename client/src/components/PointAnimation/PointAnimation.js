import React from 'react'
import { useSelector } from 'react-redux'
import './PointAnimation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const PointAnimation = () => {
    const pointsJustScored = useSelector(state => state.pointsJustScored)

    return (
        <div className='PointAnimation__center'>
            <FontAwesomeIcon icon={faPlus} /> {pointsJustScored} Points!
        </div>
    )
}

export default PointAnimation