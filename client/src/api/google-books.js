import axios from 'axios'

const api = axios.create({}) 

export const searchBooks = (query) => api.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)