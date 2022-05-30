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
    const navigate = useNavigate()
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
        console.log('just set from feed');
        dispatch(setCurrentPost(post))
        navigate(`/view-post/${post._id}`)
    }

    return (
        <Card className="Post">
            <Card.Body>
                <div className='Post__user-details'>
                    <div className='Post__profile-image-container'>
                        <Link to={`/public-profile/${post?.createdBy._id}`} >
                            <img src={post?.createdBy?.profileImage} />
                        </Link>
                    </div>
                    <div className='Post__user-cred'>
                        <Link to={`/public-profile/${post?.createdBy._id}`}>
                            <p>{post?.createdBy?.name}</p>
                        </Link>
                        <p className={`Post__level-${post.createdBy?.level}`}>Level {post.createdBy?.level}</p>
                    </div>
                    <div className='Post__time'>
                        <p>{postDate}</p>
                    </div>
                </div>

                <div className='d-flex mb-10'>
                    <div className='Post__book'>
                        {
                            post.book.thumbnail
                            ?
                            <img src={post.book?.thumbnail} className='Post__book__thumbnail'/>
                            :
                            <I icon={faBook} className='Post__book__thumbnail'/>
                        }
                    </div>
                    <div className='Post__content'>
                        <p className='Post__content__action'>{post?.action}</p>
                        <p className='CurrentlyReadingCard__title'>{post.book?.title}</p>
                        { post.book.subtitle && <p className='CurrentlyReadingCard__subtitle'>{post.book?.subtitle}</p> }
                    </div>
                </div>
                
                {/* Review */}
                {window.location.pathname === '/view-post' && <div><p className='mt-2'>{post?.book?.review}</p></div>}
                {/* Footer */}
                <div className='Post-footer'>
                    { 
                        post.action === 'Just wrote a review for' && window.location.pathname === '/feed'
                        ? 
                        <div className='read-review-btn'><span onClick={() => handleSelectPost(post)}>Read Review <I icon={faAngleRight}/></span></div>
                        :
                        undefined
                    }

                    <div><p>{post?.comments?.length} <I icon={faComment} onClick={() => handleSelectPost(post)} /></p></div>
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