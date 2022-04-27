import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Card from 'react-bootstrap/esm/Card'

import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faComment, faBook, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { dislikePost, likePost } from '../../../actions/posts'
import { setCurrentPost } from '../../../actions/currentPost'

import './Post.css'

const Post = ({ post }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)

    const [months, setMonths] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [days, setDays] = useState([])
    const [postDate, setPostDate] = useState('')


    useEffect(() => {
        setPostDate(`${months[new Date(post.createdAt).getMonth()]} ${new Date(post.createdAt).getDate()}`)
    }, [])

    const handleLikePost = () => {
        // If the post is disliked, "un-dislike" it
        if (post.dislikedBy.findIndex((likerId) => likerId === user._id) > -1) {
            dispatch(dislikePost(post._id, user._id))
        }

        dispatch(likePost(post._id, user._id))
    }

    const handleDislikePost = () => {
        // If the post is liked, "un-like" it
        if (post.likedBy.findIndex((likerId) => likerId === user._id) > -1) {
            dispatch(likePost(post._id, user._id))
        }
        dispatch(dislikePost(post._id, user._id))
    }

    const handleSelectPost = (post) => {
        dispatch(setCurrentPost(post))
    }

    return (
        <Card className="Post">
            <Card.Body>
                {/* User Details */}
                <div className='Post__user-details'>
                    <div className='Post__profile-image-container'>
                        <img src={post?.createdBy?.profileImage} />
                    </div>
                    <div className='Post__user-cred'>
                        <p>{post?.createdBy?.name}</p>
                        <p className={`Post__level-${post.createdBy?.level}`}>Level {post.createdBy?.level}</p>
                    </div>
                    <div className='Post__time'>
                        <p>{postDate}</p>
                    </div>
                </div>
                {/* Action */}
                <div className='Post__action'>
                    <p>{post?.action}</p>
                </div>
                {/* Book */}
                <div className='Post__book'>
                    <I icon={faBook} style={{color: 'var(--bs-gray-500)', fontSize: "40px"}}/>
                    <h4>{post.book?.title}</h4>
                </div>
                {/* Review */}
                {window.location.pathname === '/view-post' && <div><p className='mt-2'>{post?.book?.review}</p></div>}
                {/* Footer */}
                <div className='Post-footer'>
                    { 
                        post.action === 'Just wrote a review for' && window.location.pathname === '/feed'
                        ? 
                        <div to="/view-post" style={{ margin: '0 auto 0 0'}} onClick={() => handleSelectPost(post)}>
                            <p style={{ margin: '5px auto 0 0'}}>Read Review <I icon={faAngleRight} /></p>
                        </div>
                        :
                        undefined
                    }

                    <div to="/view-post"><p>{post?.comments?.length} <I icon={faComment} onClick={() => handleSelectPost(post)} /></p></div>
                    <p>
                        {post.dislikedBy.length}{' '}
                        <I 
                            className={post.dislikedBy.findIndex((likerId) => likerId === user._id) > -1 ? 'highlighted' : ''} 
                            icon={faThumbsDown}  
                            onClick={handleDislikePost}
                        />
                    </p>
                    <p>
                        {post.likedBy.length}{' '}
                        <I 
                            className={post.likedBy.findIndex((likerId) => likerId === user._id) > -1 ? 'highlighted' : ''} 
                            icon={faThumbsUp}  
                            onClick={handleLikePost}
                        />
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Post