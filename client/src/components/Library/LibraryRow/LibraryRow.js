import React from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

import './LibraryRow.css'

function LibraryRow({title, author}) {

    return (
        <Card className='LibraryRow'>
            <Card.Body className="LibraryRow__body">
                <Col xs={2} className='LibraryRow__book-icon-container'><FontAwesomeIcon icon={faBook} className='LibraryRow__book-icon'/></Col>
                <Col xs={10}>
                    <p className='LibraryRow__title'>{title}</p>
                    <p className='LibraryRow__subtitle'>By {author}</p>
                </Col>
            </Card.Body>
        </Card>
    );
}

export default LibraryRow;
