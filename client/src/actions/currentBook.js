import * as api from '../api'
import { store } from '../index';

export const setCurrentBook = (book) => {
    // This was all dumb and useless
        // const state = store.getState()
        // const books = state.books
        // let currentBook = books.find((book) => book._id === id)

    return {
        type: 'SET_CURRENT_BOOK',
        payload: book
    }
}