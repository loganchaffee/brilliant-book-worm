import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './PublicProfileModal.css'

const PublicProfileModal = ({ selectedBook, handleCloseModal, visitedUser, showModalReview, setShowModalReview }) => {
    return <Modal centered show={selectedBook} onHide={handleCloseModal} >
        <Modal.Header closeButton>
            <div className='PublicProfile__modal__title-container'>
                <Modal.Title>{selectedBook?.title}</Modal.Title>
                <p>{selectedBook?.subtitle}</p>
            </div>
        </Modal.Header>
        <Modal.Body className='d-flex flex-wrap'>
            <div className='PublicProfile__modal__book'>
                <img src={selectedBook?.thumbnail} />
            </div>
            <div className='PublicProfile__modal__details'>
                <div className='d-flex justify-content-between'>
                    <span>Author:</span>
                    <span>{selectedBook?.author}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Pages:</span>
                    <span>{selectedBook?.numberOfPages}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Publication Date</span>
                    <span>{selectedBook?.publicationDate}</span>
                </div>
                {
                    selectedBook?.numberOfStars > 0
                    &&
                    <div className='d-flex justify-content-between'>
                        <span>{visitedUser.name}'s Rating</span>
                        <span>
                            {
                                new Array(selectedBook?.numberOfStars).fill('').map((star, index) => <FontAwesomeIcon key={'modal-star' + index} icon={faStar} color='var(--warning)' />)
                            }
                        </span>
                    </div>
                }
            </div>
            <div className='PublicProfile__modal__review'>
                {
                    showModalReview && selectedBook?.review
                    ?
                    <div>
                        <p>{visitedUser?.name}'s Review:</p>
                        {selectedBook?.review}
                    </div>
                    :
                    undefined
                }
                {
                    !showModalReview && selectedBook?.review
                    ?
                    <p onClick={() => setShowModalReview(true)}>Read {visitedUser.name}'s Review <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '5px' }} /></p>
                    :
                    undefined
                }
            </div>
        </Modal.Body>
    </Modal>
}

export default PublicProfileModal