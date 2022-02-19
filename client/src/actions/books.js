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
    const response = await api.createBook(newBook)
    const data = response.data

    dispatch({type: 'CREATE', payload: data})
}

export const updateBook = (id, updatedBook) => async (dispatch) => {
    const response = await api.updateBook(id, updatedBook)
    const data = response.data

    dispatch({type: 'UPDATE_BOOK', payload: data})
}

export const deleteBook = (id) => async (dispatch) => {
    const response = await api.deleteBook(id)
    const data = response.data

    dispatch({type: 'DELETE_BOOK', payload: id})
}