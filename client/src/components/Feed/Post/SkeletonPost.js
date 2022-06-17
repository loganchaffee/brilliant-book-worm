import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/esm/Card'
import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faComment, faBook, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { dislikePost, likePost } from '../../../actions/posts'
import { setCurrentPost, likeCurrentPost, dislikeCurrentPost  } from '../../../actions/currentPost'
import moment from 'moment';

import './Post.css'
import './SkeletonPost.css'

const SkeletonPost = ({ post }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    const posts = useSelector((state) => state.posts)
    const currentPost = useSelector((state) => state.currentPost)

    return (
        <Card className="Post">
            <Card.Body>
                <div className='Post__user-details'>
                    <div className='SkeletonPost__profile-image-container SkeletonBackground'></div>
                    <div className='SkeletonPost__user-cred'>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div className='d-flex mb-10'>
                    <div className='SkeletonPost__book'></div>
                    <div className='SkeletonPost__content-container'>
                        <div className='SkeletonPost__content'></div>
                        <div className='SkeletonPost__content'></div>
                        <div className='SkeletonPost__content'></div>
                    </div>
                </div>
                
                <div className='Post-footer'>
                   
                </div>
            </Card.Body>
        </Card>
    )
}

export default SkeletonPost