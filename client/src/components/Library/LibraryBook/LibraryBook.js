import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import './LibraryBook.css'

function LibraryBook({title, color}) {

    const starArray = new Array(5).fill('')

    return (
        <Card className='LibraryBook' >
            <Card.Body className="LibraryBook__body">
                <p className="LibraryBook__title">{title}</p>
                <Icon icon={faBookmark} className="LibraryBook__book-mark" style={{color: color}}/>
            </Card.Body>
        </Card>
    );
}

export default LibraryBook;
