
export default (currentBook = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_BOOK':
            return action.payload
        default:
            return currentBook;
    }
}