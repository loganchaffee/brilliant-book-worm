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

function Feed() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentVisitedUser = useSelector((state) => state.currentVisitedUser)
    const currentPost = useSelector((state) => state.currentPost)
    const posts = useSelector((state) => state.posts)

    const [searchText, setSearchText] = useState('')
    const [currentTimeoutId, setCurrentTimeoutId] = useState(0)
    const [users, setUsers] = useState([])

    // -----Get New Posts On Scroll-------------------------------------------------------------------------------------
    const isLoading = useRef(false)
    useEffect(() => { isLoading.current = false }, [posts.length])
    const [scrollTop, setScrollTop] = useState(false)
    useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.documentElement.scrollTop)
            if ((window.innerHeight + e.target.documentElement.scrollTop) >= document.body.offsetHeight - 400) {
                if (!isLoading.current) {
                    dispatch(getPosts(posts.length))
                    isLoading.current = true
                }
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop])

    return (
        <div className="Feed">
            <Row className='Feed__row'>
                <Col xs={12} sm={7}>
                    <h1 className='title-1'>News Feed</h1>
                    { posts.map((post) => <Post key={post._id} post={post} />) }
                </Col>
                <Col xs={12} sm={5}>
                    <h1 className='title-2'>News Feed</h1>
                    <div className='Feed__sidebar'>
                        <UsersSearch />
                        <FollowersSection />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Feed;
