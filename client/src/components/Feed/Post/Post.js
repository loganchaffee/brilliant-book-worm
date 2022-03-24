import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons'


import './Post.css'

const Post = (props) => {
    const user = useSelector((state) => state.auth)

    return (
        <Card className="Post">
            <Card.Body>
                <div className='Post__first-row'>
                    <div className='Post__profile-image-container'><img src={user.profileImage} /></div>
                    <div className='Post__first-row__right'>
                        <p>Lauren Chaffee</p>
                        <p>Level 2</p>
                    </div>
                </div>
                <Row className='Post__action'>
                    <p>Just started Reading:</p>
                </Row>
                <Row className='Post__book'>
                    <h4>12 Rules for Life: An Antidote to Chaos</h4>
                </Row>
                <div className='Post-footer'>
                    <p><I icon={faComment} /></p>
                    <p><I icon={faThumbsDown} /></p>
                    <p><I icon={faThumbsUp} /></p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Post