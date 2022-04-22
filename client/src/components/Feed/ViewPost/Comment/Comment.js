import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Bootstrap
import { Col, Container, Row, Card, Form, Button} from 'react-bootstrap'
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { deleteComment } from '../../../../actions/posts'
// Styles
import './Comment.css'

const Comment = ({ comment }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const currentPost = useSelector((state) => state.currentPost)

    const [stagedForDeletion, setStagedForDeletion] = useState(false)

    const handleDeleteComment = () => {
        dispatch(deleteComment(currentPost._id, comment._id))
    }

    console.log();

    return (
       <Card className="Comment">
           <Card.Body>
                <div className='Comment__user-cred'>
                    <p>{comment?.createdBy?.name}</p>
                    <p className={`Comment__level-${comment?.createdBy?.level}`}>Level {comment?.createdBy?.level}</p>
                    { comment.createdBy._id === user._id && <p onClick={() => setStagedForDeletion(!stagedForDeletion)} className='comment__dots'><FontAwesomeIcon icon={faEllipsisH} /></p>}
                    { stagedForDeletion && <Button variant='danger' onClick={handleDeleteComment} className='comment__delete-btn'>Delete?</Button> }
                </div>
                <p className='Comment__text'>{comment.text}</p>
           </Card.Body>
       </Card>
    )
}

export default Comment