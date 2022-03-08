import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'}) 

API.interceptors.request.use((config) => {
    if (localStorage.getItem('user')) {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))}`
        return config
    }
    return config
}, (error) => Promise.reject(error))

// Books
export const fetchBooks = () => API.get('/books')
export const createBook = (newBook) => API.post('/books', newBook)
export const updateBook = (id, updatedBook) => API.patch(`/books/${id}`, updatedBook)
export const deleteBook = (id) => API.delete(`/books/${id}`)

// User
export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)
export const getUserInfo = () => API.post('/users/get-info')
export const updateUser = (formData) => API.post('/users/update', formData)
export const updateUserWpm = (wpm) => API.post('/users/update-wpm', wpm)
export const updateUserProfileImage = (imageData) => API.post('/users/update-profile-image', imageData)
export const deleteUser = () => API.post('/users/delete')

// Other
export const getBookExcerpt = () => API.get('/reading-test')