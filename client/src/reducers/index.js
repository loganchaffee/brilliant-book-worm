import { combineReducers } from 'redux'
import books from './books'
import currentBook from './currentBook'
import auth from './auth'
import wpm from './wpm'
import currentVisitedUser from './currentVisitedUser'
import currentVisitedUserBookData from './currentVisitedUserBookData'
import posts from './posts'
import currentPost from './currentPost'

export default combineReducers({ 
    books, 
    currentBook, 
    auth, 
    wpm, 
    currentVisitedUser, 
    currentVisitedUserBookData,
    posts,
    currentPost,
});