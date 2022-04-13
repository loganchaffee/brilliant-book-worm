import React, { useState, useEffect } from 'react'
// Bootstrap
import { Col, Container, Row, Card, Form, Button} from 'react-bootstrap'

import './Comment.css'

const Comment = ({ comment }) => {
    return (
       <Card className="Comment">
           <Card.Body>
                <div className='Comment__user-cred'>
                    <p>{comment?.createdBy?.name}</p>
                    <p className={`Comment__level-${comment?.createdBy?.level}`}>Level {comment?.createdBy?.level}</p>
                    <p></p>
                </div>
                <p className='Comment__text'>{comment.text}</p>
           </Card.Body>
       </Card>
    )
}

export default Comment