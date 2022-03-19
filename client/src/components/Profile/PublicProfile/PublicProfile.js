import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

// redux actions and api calls
import { signout, deleteUser, updateUser, follow, unfollow } from '../../../actions/auth'
import { fetchVisitedUserBooks } from '../../../actions/currentVisitedUserBooks';

// Custom Components
import LibraryRow from '../../Library/LibraryRow/LibraryRow'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faAngleLeft, faMinus } from '@fortawesome/free-solid-svg-icons'

// Styles
import '../Profile.css'
import './PublicProfile.css'
import '../../Library/LibraryRow/LibraryRow.css'

<i class="fa-solid fa-user-group"></i>
const PublicProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.auth)
    const visitedUser = useSelector((state) => state.currentVisitedUser)
    const visitedUserBookData = useSelector((state) => state.currentVisitedUserBookData)

    const [formattedName, setFormattedName] = useState('') // Capitalized Name

    // Set Initial Data
    useEffect(() => {
        setFormattedName(`
            ${visitedUser.name.split(' ')[0].charAt(0).toUpperCase() + visitedUser.name.split(' ')[0].slice(1)}
            ${visitedUser.name.split(' ')[1].charAt(0).toUpperCase() + visitedUser.name.split(' ')[1].slice(1)}
        `)
    }, [visitedUser])

    const handleFollow = () => {
        // We only need to send the names and id's to the server so lets trim the data
        const trimmedUser = { name: user.name, id: user._id }
        const trimmedVisitedUser = { name: visitedUser.name, id: visitedUser._id }
        dispatch(follow(trimmedUser, trimmedVisitedUser))
    }

    const handleUnfollow = () => {
        const trimmedUser = { name: user.name, id: user._id }
        const trimmedVisitedUser = { name: visitedUser.name, id: visitedUser._id }
        dispatch(unfollow(trimmedUser, trimmedVisitedUser))
    }

    return (
        <Container className="Profile">
            <Row>
                <Col xs={12}>
                    <Link to="/feed" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="profile-image-container">
                    <div className="profile-image-circle">
                        {visitedUser.profileImage ? <img className='profile-image' src={visitedUser.profileImage} /> : visitedUser.name.split('')[0]}
                    </div>
                    <div>
                        <p className="profile-name">{formattedName}</p>
                       { visitedUser.points < 500 ? <p className={`profile-level-${1}`}>Level {1}</p> : undefined }
                       { visitedUser.points < 1000 && visitedUser.points >= 500 ? <p className={`profile-level-${2}`}>Level {2}</p> : undefined }
                       { visitedUser.points < 2000 && visitedUser.points >= 1000 ? <p className={`profile-level-${3}`}>Level {33}</p> : undefined }
                       { visitedUser.points >= 2000 ? <p className={`profile-level-${4}`}>Level {4}</p> : undefined }
                    </div>
                    <div style={{marginLeft: 'auto'}}>
                        { 
                            user.following.findIndex((user) => user.id === visitedUser._id) === -1 
                            ? 
                            <Button variant='outline-primary' style={{borderRadius: '25px'}} onClick={handleFollow}><FontAwesomeIcon icon={faPlus} /> Follow</Button>
                            :
                            <Button variant='outline-secondary' style={{borderRadius: '25px'}} onClick={handleUnfollow}><FontAwesomeIcon icon={faMinus} /> Unfollow</Button>
                        }

                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <h3>Statistics</h3>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>Reading Speed</Col>
                <Col xs={6}><p className="statistics__value">{visitedUser.wordsPerMinute} WPM</p></Col>
           
                <Col xs={6}>Books Read</Col>
                <Col xs={6}><p className="statistics__value">{visitedUserBookData.completedBooks.length}</p></Col>

                <Col xs={6}>Reviews Written</Col>
                <Col xs={6}><p className="statistics__value">{visitedUserBookData.reviewedBooks.length}</p></Col>

                <Col xs={6}>Points</Col>
                <Col xs={6}><p className="statistics__value">{visitedUser.points}</p></Col>
         
                <Col xs={6}>Following</Col>
                <Col xs={6}><p className="statistics__value">0</p></Col>
         
                <Col xs={6}>Followers</Col>
                <Col xs={6}><p className="statistics__value">0</p></Col>
            </Row>
            {
                visitedUserBookData.currentlyReadingBooks.length > 0 
                &&
                <>
                    <Row>
                        <Col xs={12}><h3>{formattedName} is currently reading: </h3></Col>
                    </Row>
                    {
                        visitedUserBookData.currentlyReadingBooks.map((book, index) => <LibraryRow key={book._id + index} title={book.title}  author={book.author} /> )
                    }
                </>
            }
            {
                visitedUserBookData.completedBooks.length > 0
                &&
                <>
                    <Row>
                        <Col xs={12}><h3>Library</h3></Col>
                    </Row>
                    {
                        visitedUserBookData.completedBooks.map((book, index) => <LibraryRow key={book._id + index} title={book.title}  author={book.author} /> )
                    }
                </>
            }
        </Container>
    )
}

export default PublicProfile
