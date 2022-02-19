import React from 'react';

import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

import './CurrentlyReadingCard.css'
function CurrentlyReadingCard({title, author, completionTime, currentPage, numberOfPages, progress}) {

    return (
        <Card className='CurrentlyReadingCard'>
            {/* <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{author}</Card.Subtitle>
                <Card.Text>Completion Time: {completionTime}</Card.Text>
                <Card.Text>Current Page: {`${currentPage} / ${numberOfPages}`}</Card.Text>
                <Card.Text>Progress: </Card.Text>
                <ProgressBar variant='warning' now={progress} />
            </Card.Body> */}
            <Card.Body className="CurrentlyReadingCard__body">
                <Col xs={2} className='CurrentlyReadingCard__book-icon-container'><FontAwesomeIcon icon={faBook} className='CurrentlyReadingCard__book-icon'/></Col>
                <Col xs={10}>
                    <p className='CurrentlyReadingCard__title'>{title}</p>
                    <p className='CurrentlyReadingCard__subtitle'>By {author}</p>
                    <p className='CurrentlyReadingCard__time'>Completion Time: {completionTime}</p>
                    <div className='CurrentlyReadingCard__pages-container'>
                        <div className="CurrentlyReadingCard__pages-col"><p className='CurrentlyReadingCard__pages'>Page: {`${currentPage} / ${numberOfPages}`} </p></div>
                        <Col><ProgressBar variant='warning' now={progress} className='CurrentlyReadingCard__ProgressBar'/></Col>
                    </div>
                </Col>
            </Card.Body>
        </Card>
    );
}

export default CurrentlyReadingCard;
