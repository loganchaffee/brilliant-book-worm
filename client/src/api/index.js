import axios from 'axios'

// const api = axios.create({ baseURL: 'http://localhost:5000'}) 
const api = axios.create({ baseURL: '/'}) 

api.interceptors.request.use((config) => {
    if (localStorage.getItem('user')) {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))}`
        return config
    }
    return config
}, (error) => Promise.reject(error))

// Books
export const fetchBooks = () => api.get('/books')
export const createBook = (newBook) => api.post('/books', newBook)
export const updateBook = (id, updatedBook) => api.patch(`/books/${id}`, updatedBook)
export const deleteBook = (id) => api.delete(`/books/${id}`)

// Auth
export const signin = (formData) => api.post('/users/signin', formData)
export const signup = (formData) => api.post('/users/signup', formData)
export const getUserInfo = () => api.post('/users/get-info')
export const updateUser = (formData) => api.post('/users/update', formData)
export const deleteUser = () => api.post('/users/delete')

export const follow = (data) => api.post('/users/follow', data)
export const unfollow = (data) => api.post('/users/unfollow', data)

// Other
export const getBookExcerpt = () => api.get('/reading-test')

// All Users
export const fetchUsersNamesAndIds = (query) => api.post('/all-users/fetch-users', query)
export const fetchVisitedUser = (userId) => api.post('/all-users/fetch-visited-user', userId)
export const fetchVisitedUserBooks = (userId) => api.post('/all-users/fetch-visited-user-books', userId)

// Posts
export const fetchPosts = () => api.get('/posts')
export const createPost = (data) => api.post('/posts', data)
export const likePost = (data) => api.post('/posts/like-post', data)
export const dislikePost = (data) => api.post('/posts/dislike-post', data)
export const createComment = (data) => api.post('/posts/create-comment', data)