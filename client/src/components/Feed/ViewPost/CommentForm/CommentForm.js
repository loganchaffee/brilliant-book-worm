import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Redux Actions
import { createComment } from '../../../../actions/posts'
// Bootstrap
import {Col, Container, Row, Post, Card, Form, Button, InputGroup} from 'react-bootstrap'
// Style
import './CommentForm.css'

const CommentForm = () => {
    const user = useSelector((state) => state.auth)
    const postId = useSelector((state) => state.currentPost._id)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState('')
    // const [showForm, setShowForm] = useState(true)

    const handleSubmit = () => {
        dispatch(createComment(postId, formData, user))
        // setShowForm(false)
    }

    return (
        <Form className={'main-form'}>
            <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control as='textarea' value={formData} onChange={(e) => setFormData(e.target.value)}/>
            </Form.Group>
            <Form.Group className='d-flex justify-content-end align-items-end'>
                <Button className='mb-0 submit-comment-btn' onClick={handleSubmit}>Comment</Button>
            </Form.Group>
        </Form>
    )
}

export default CommentForm