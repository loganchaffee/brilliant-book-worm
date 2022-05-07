import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { fetchCurrentPost, setCurrentPost } from '../../../actions/currentPost'

const ViewPost = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const user = useSelector((state) => state.auth)
    const posts = useSelector((state) => state.posts)
    const currentPost = useSelector((state) => state.currentPost)

    useEffect(() => {
        setTimeout(() => {
            if (!currentPost?._id) {
                // Post was not set from link on news feed page. Fetch the single post.
                dispatch(fetchCurrentPost(params))
            }
        }, 200)

        return () => dispatch(setCurrentPost(null))
    }, [])

    if (!currentPost?._id || !user?._id) return null
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
                    <Post post={currentPost} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CommentForm /> 
                </Col>
            </Row>
            <Row>
                <Col>
                    { currentPost.comments.map((comment, i) =>  <Comment key={'comment' + comment._id + i} comment={comment} /> ) }
                </Col>
            </Row>
       </Container>
    )
}

export default ViewPost