// Main dependecies
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Bootstrap
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/esm/Form'
import Card from 'react-bootstrap/esm/Card'
import Button from 'react-bootstrap/esm/Button'

// Api / Actions
import { fetchUsersNamesAndIds, fetchPosts } from '../../api'
import { getCurrentVisitedUser } from '../../actions/currentVisitedUser'
import { fetchVisitedUserBooks } from '../../actions/currentVisitedUserBooks'
import { getPosts } from '../../actions/posts'

// Styles
import './Feed.css'
import Post from './Post/Post'

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


    const handleSearch = async (e) => {
        setSearchText(e.target.value)
        if (e.target.value === '') return setUsers([])

        clearTimeout(currentTimeoutId)
        if (e.target.value !== '') {
            const timeoutId = setTimeout(async () => {
                const res = await fetchUsersNamesAndIds({ query: e.target.value })
                setUsers(res.data)
            }, 100);
            setCurrentTimeoutId(timeoutId)
        }
    }

    const handleClickUser = (userId) => {
        dispatch(getCurrentVisitedUser(userId))
        dispatch(fetchVisitedUserBooks(userId))
    }
    

    return (
        <Container className="Feed">
            <Row>
                <Col xs={12}>
                    <h4 style={{ paddingLeft: '0' }}>Feed</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form className="main-form">
                        <Form.Group>
                            <Form.Label>See what other people are reading</Form.Label>
                            <Form.Control type="name" placeholder="Search for people to follow" value={searchText} onChange={(e) => handleSearch(e)} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {
                        users.length > 0 && searchText !== '' 
                        ? 
                        <Card className="search-results">
                            <Card.Body>
                                { 
                                    users.map((user, index) => {
                                        return (
                                            <Link to="/public-profile" key={index + user.name} onClick={() => handleClickUser(user._id)}>
                                                <p>{user.name}</p>
                                            </Link>
                                        )
                                    }) 
                                }
                            </Card.Body>
                        </Card>
                        :
                        undefined
                    }
                </Col>
            </Row>
            { posts.map((post) => <Post key={post._id} post={post} />) }
        </Container>
    )
}

export default Feed;
