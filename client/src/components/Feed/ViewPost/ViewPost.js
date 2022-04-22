import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Bootstrap
import { Col, Container, Row, Card, Form, Button} from 'react-bootstrap'
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
// Custom Components
import ScrollToTopOnMount from '../../ScrollToTopOnMount/ScrollToTopOnMount'
import CommentForm from './CommentForm/CommentForm'
import Post from '../Post/Post'
import Comment from './Comment/Comment'

const ViewPost = () => {
    const user = useSelector((state) => state.auth)
    const posts = useSelector((state) => state.posts)
    const currentPost = useSelector((state) => state.currentPost)

    if (!user._id || !currentPost._id) return null
    return (
       <Container>
            <ScrollToTopOnMount />
            <Row>
                <Col xs={12}>
                    <Link to="/feed" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    { currentPost && <Post post={currentPost} /> }
                </Col>
            </Row>
            <Row>
                <Col>
                    { currentPost && <CommentForm /> }
                </Col>
            </Row>
            <Row>
                <Col>
                    { 
                        currentPost 
                        && 
                        currentPost.comments.reverse().map((comment, i) =>  <Comment key={'comment' + comment._id + i} comment={comment} /> )
                    }
                </Col>
            </Row>
       </Container>
    )
}

export default ViewPost