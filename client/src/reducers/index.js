import { combineReducers } from 'redux'
import books from './books'
import currentBook from './currentBook'
import auth from './auth'
import wpm from './wpm'
import currentVisitedUser from './currentVisitedUser'
import currentVisitedUserBookData from './currentVisitedUserBookData'
import posts from './posts'
import currentPost from './currentPost'
import notifications from './notifications'
import notificationsModal from './notificationsModal'
import pointsJustScored from './pointsJustScored'

export default combineReducers({ 
    books, 
    currentBook, 
    auth, 
    wpm, 
    currentVisitedUser, 
    currentVisitedUserBookData,
    posts,
    currentPost,
    notifications,
    notificationsModal,
    pointsJustScored
});