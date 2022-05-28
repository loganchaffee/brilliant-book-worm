import React, {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap'
import { signout, deleteUser, updateUser, follow } from '../../../actions/auth'
import { getCurrentVisitedUser,  } from '../../../actions/currentVisitedUser';
import { fetchVisitedUserBooks } from '../../../actions/currentVisitedUserBooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faMinus, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import './FollowersSection.css'

const FollowersSection = ({ title }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    // Visit another user's public profile page
    const handleClickUser = (userId) => {
        dispatch(fetchVisitedUserBooks(userId))
        dispatch(getCurrentVisitedUser(userId))
    }

    return <div className='FollowersSection box-shadow'>
    {    
        title
        &&
        <Row>
            <Col xs={12}>
                <h3>{title}</h3>
            </Col>
        </Row>
    }

        <div className='mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
                    <span className='FollowersSection__subtitle'>
                        Following{' '}
                        {user.following.length}
                    </span>
                    { 
                        user.following.length > 5
                        &&
                        <span className='FollowersSection-show-more-btn' onClick={() => setShowFollowing(!showFollowing)}>
                            {
                                showFollowing 
                                ? 
                                <span>Show Less <FontAwesomeIcon className='following-followers-btn' icon={faMinus} /></span>
                                :
                                <span>Show More <FontAwesomeIcon className='following-followers-btn' icon={faPlus} /></span>
                            }
                        </span>
                    }
            </div>
            {
                user.following.map((followee, i) => {
                    if (!showFollowing && i > 4) return

                    return <Link
                        key={followee._id}
                        onClick={() => handleClickUser(followee._id)}
                        to='/public-profile'
                        className="FollowersSection__user"
                    >
                        <FontAwesomeIcon icon={faUser} /> {followee.name}
                    </Link>
                })
            }
        </div>
        
        <div className='mb-10'>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='FollowersSection__subtitle'>
                    Followers{' '}
                    {user.followers.length}
                </span>
                {
                    user.followers.length > 5
                    &&
                    <span className='FollowersSection-show-more-btn' onClick={() => setShowFollowers(!showFollowers)}>
                        {
                            showFollowers 
                            ? 
                            <span>Show Less <FontAwesomeIcon className='following-followers-btn' icon={faMinus} /></span>
                            :
                            <span>Show More <FontAwesomeIcon className='following-followers-btn' icon={faPlus} /></span>
                        }
                    </span>
                }
               
            </div>
            {
                user.followers.map((follower, i) => {
                    if (!showFollowers && i > 4) return

                    return <Link
                        key={follower._id}
                        onClick={() => handleClickUser(follower._id)}
                        to='/public-profile'
                        className="FollowersSection__user"
                    >
                        <FontAwesomeIcon icon={faUser} /> {follower.name}
                    </Link>
                })
            }
        </div>
    </div>
}

export default FollowersSection