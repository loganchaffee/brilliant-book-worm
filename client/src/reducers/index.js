import { combineReducers } from 'redux'
import books from './books'
import currentBook from './currentBook'
import auth from './auth'

export default combineReducers({ books, currentBook, auth });