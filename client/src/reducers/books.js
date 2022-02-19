export default (books = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
        case 'CREATE':
            // Temporary fix for duplicate documents in redux store
            // due to FETCH_ALL firing before CREATE sometimes
            let alreadyInStore = false
            for (let i = 0; i < books.length; i++) {
                const book = books[i];
                if (book._id === action.payload._id) {
                    alreadyInStore = true
                    console.log('2x');
                }
            }
            return alreadyInStore ? [...books] : [...books, action.payload]
        case 'UPDATE_BOOK':
            return books.map((book) => book._id === action.payload._id ? action.payload : book)
        case 'DELETE_BOOK':
            return books.filter((book) => book._id !== action.payload);
        default:
            return books;
    }
}