import * as api from '../api'

export const getBooks = () => async (dispatch) => {
    try {
        const response = await api.fetchBooks()
        const data = response.data

        dispatch({type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const createBook = (newBook) => async (dispatch) => {
    try {
        // Create Book
        const response = await api.createBook(newBook)
        const book = response.data
        // Put book data in store
        dispatch({type: 'CREATE', payload: book})
    } catch (error) {
        console.log(error);
    }
}

export const updateBook = (id, updatedBook, setAlertMessage) => async (dispatch) => {
    try {
        const response = await api.updateBook(id, updatedBook)
        const data = response.data
        dispatch({type: 'UPDATE_BOOK', payload: data})
        if (setAlertMessage) {
            setAlertMessage('Deadline was successfully set! Finish on time to earn some points!')
        }
    } catch (error) {
        console.log(error);
        setAlertMessage('There was an error')
    }
}

export const deleteBook = (id) => async (dispatch) => {
    try {
        const response = await api.deleteBook(id)
        const data = response.data
    
        dispatch({type: 'DELETE_BOOK', payload: id})
    } catch (error) {
        console.log(error);
    }
   
}