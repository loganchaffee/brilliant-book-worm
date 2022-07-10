// Main dependecies
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Bootstrap
import { Col, Container, Row, Form, Card, Button } from 'react-bootstrap'
// Api / Actions
import { fetchUsersNamesAndIds, fetchPosts } from '../../api'
import { getCurrentVisitedUser } from '../../actions/currentVisitedUser'
import { fetchVisitedUserBooks } from '../../actions/currentVisitedUserBooks'
import { getPosts } from '../../actions/posts'
// Styles
import './Feed.css'
import Post from './Post/Post'
import FollowersSection from '../Profile/FollowersSection/FollowersSection'
import UsersSearch from './UsersSearch/UsersSearch'
import SkeletonLoadingCard from '../common/SkeletonLoadingCard/SkeletonLoadingCard'
import SkeletonPost from './Post/SkeletonPost'

function Feed() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentVisitedUser = useSelector((state) => state.currentVisitedUser)
    const currentPost = useSelector((state) => state.currentPost)
    const posts = useSelector((state) => state.posts)
    const user = useSelector((state) => state.auth)
    const books = useSelector((state) => state.books)

    const [searchText, setSearchText] = useState('')
    const [currentTimeoutId, setCurrentTimeoutId] = useState(0)
    const [users, setUsers] = useState([])
    const [lastPost, setLastPost] = useState(null)
    const [observer, setObserver] = useState(null)
    const [showSkeletonLoading, setShowSkeletonLoading] = useState(true)

    useEffect(() => {
        if (posts.length === 0) dispatch(getPosts(0))
    }, [])

    // Get New Posts On Scroll---------------------------------------------------
    // Intersection observer options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: .01
    }

    useEffect(() => {
        setTimeout(() => {
            setShowSkeletonLoading(false)
        }, 3000);
    }, [])

    useEffect(() => {
        if (user.following.length === 0 && books.length === 0) setShowSkeletonLoading(false)
    }, [user.following.length])

    // Give the observer a target every time the last post changes
    useEffect(() => {
        if (lastPost) observer.observe(lastPost)

        return () => {
            if (lastPost) observer.unobserve(lastPost)
        }
    }, [lastPost])

    // Set lastPost to the last post
    useEffect(() => {
        const postsContainer = document.getElementById('postsContainer')
        const target = postsContainer.lastChild
        // If there are only a few posts
        if (posts.length >= 20) {
            setLastPost(postsContainer.children[postsContainer.children.length - 10])
        } else if (posts.length >= 10) {
            setLastPost(postsContainer.children[postsContainer.children.length - 10])
        } else {
            setLastPost(target)
        }
        
        // Redefine callback function every time the post length changes.
        // The request this function makes needs access to the posts length as the length updates.
        // That is why it must be redefined.
        const callback = (entries) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                setLastPost(null)
                dispatch(getPosts(posts.length)) // Fetch more posts (needs the current length of posts)
            }
        }

        // Create new intersection observer every time the posts length changes
        setObserver(new IntersectionObserver(callback, options))
    }, [posts.length])

    return (
        <div className="Feed">
            <Row className='Feed__row'>
                <Col xs={12} sm={7}>
                    <h1 className='title-1'>News Feed</h1>
                    <div id='postsContainer'>
                        {
                            (posts.length === 0 && showSkeletonLoading)
                            &&
                            <>
                                <SkeletonPost />
                                <SkeletonPost />
                                <SkeletonPost />
                                <SkeletonPost />
                            </>
                        }
                        {
                            (posts.length === 0 && !showSkeletonLoading)
                            &&
                            <h3 style={{textAlign: 'center', marginTop: '50px', color:'var(--secondary)'}}>No new posts</h3>
                        }
                        {
                            posts.length > 0
                            &&
                            posts.map((post) => <Post key={'post-' + post._id} post={post} />)
                        }
                    </div>
                </Col>
                <Col xs={12} sm={5} className='mb-10'>
                    <h1 className='title-2'>News Feed</h1>
                    <div className='Feed__sidebar'>
                            <UsersSearch />
                        <div className='d-none d-sm-block'>
                            <FollowersSection user={user} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Feed;
