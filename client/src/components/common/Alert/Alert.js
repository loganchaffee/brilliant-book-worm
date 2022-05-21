import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faCheckCircle, faWindowClose, faExclamationCircle, faCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Alert as BootstrapAlert } from 'react-bootstrap';
import './Alert.css'

const Alert = ({ variant, content, onClose }) => {
    return <BootstrapAlert variant={variant} className={`alert-${variant}`}>
        <span className='line'/>

        { !variant && <FontAwesomeIcon icon={faCircle} /> }
        { variant === 'success' && <FontAwesomeIcon icon={faCheckCircle} /> }
        { variant === 'warning' && <FontAwesomeIcon icon={faExclamationTriangle} /> }
        { variant === 'danger' && <FontAwesomeIcon icon={faExclamationCircle} /> }

        { content }

        <FontAwesomeIcon icon={faWindowClose} onClick={onClose}/>
    </BootstrapAlert>
}

export default Alert