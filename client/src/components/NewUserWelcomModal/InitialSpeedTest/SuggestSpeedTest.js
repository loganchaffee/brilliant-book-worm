import React from 'react'
import { Button } from 'react-bootstrap'
import CurrentlyReadingCard from '../../CurrentlyReading/CurrentlyReadingCard/CurrentlyReadingCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const SuggestSpeedTest = ({ setStep, step, setCurrentPage, currentPage }) => {
    const exampleBook = {
        _id: "62ca36c323a8030f579c9661",
        author: "Frank Herbert",
        createdAt: "2022-07-10T02:17:39.377Z",
        createdBy: "6269de95f1a68496c28d161e",
        currentPage: 0,
        isCompleted: false,
        numberOfPages: 528,
        numberOfStars: 0,
        publicationDate: "2005",
        thumbnail: "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        title: "Dune",
        updatedAt: "2022-07-10T02:17:39.377Z",
    }   

    const exampleUser = {
        wordsPerMinute: 185
    }

    return <div>
        <h3>Find your WPM</h3>
        <p>Setting your reading speed will allow Bookworm to more accurately predict how long new books should take you to read</p>
        <div style={{marginBottom: '20px', position: 'relative'}}>
            <FontAwesomeIcon icon={faArrowLeft} className='card-example-arrow'/>
            <CurrentlyReadingCard book={exampleBook} disableZoom={true} overrideUser={exampleUser} />
        </div>
        <div className='d-flex'>
            <Button className='mr-10 full-width-btn' onClick={() => setStep(step + 1)}>Take Test</Button>
            <Button variant='secondary full-width-btn' className='mr-10' onClick={() => setCurrentPage(currentPage + 1)}>Skip For Now</Button>
        </div>
    </div>
}

export default SuggestSpeedTest