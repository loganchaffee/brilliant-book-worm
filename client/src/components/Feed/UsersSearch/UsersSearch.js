// Main dependecies
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Bootstrap
import { Col, Container, Row, Form, Card, Button } from 'react-bootstrap'
// Api / Actions
import { fetchUsersNamesAndIds, fetchPosts } from '../../../api'
import { getCurrentVisitedUser } from '../../../actions/currentVisitedUser'
import { fetchVisitedUserBooks } from '../../../actions/currentVisitedUserBooks'
// Styles
import './UsersSearch.css'

const UsersSearch = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentVisitedUser = useSelector((state) => state.currentVisitedUser)
    const currentPost = useSelector((state) => state.currentPost)
    const posts = useSelector((state) => state.posts)

    const [searchText, setSearchText] = useState('')
    const [currentTimeoutId, setCurrentTimeoutId] = useState(0)
    const [users, setUsers] = useState([])

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
        <Form className="main-form UsersSearch">
            <Form.Group>
                <Form.Label>See what other people are reading</Form.Label>
                <Form.Control
                    className={ users.length < 0 || searchText === '' ? 'search-bar' : 'search-bar-filled' }
                    type="name"
                    placeholder="Search for people to follow"
                    value={searchText}
                    onChange={(e) => handleSearch(e)}
                />
                {
                    users.length > 0 && searchText !== '' 
                    ? 
                    <div className="search-results box-shadow">
                        { 
                            users.map((user, index) => <Link 
                                to="/public-profile"
                                className='search-result'
                                key={index + user.name}
                                onClick={() => handleClickUser(user._id)}
                            >
                                <p>{user.name}</p>
                            </Link>)
                        }
                    </div>
                    :
                    undefined
                }
            </Form.Group>
        </Form>
    )
}

export default UsersSearch