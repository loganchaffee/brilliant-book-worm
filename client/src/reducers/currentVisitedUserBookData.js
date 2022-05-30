export default (currentVisitedUserBookData = { completedBooks: [], reviewedBooks: [], currentlyReadingBooks: [] }, action) => {
    switch (action.type) {
        case 'SET_CURRENT_VISITED_USER_BOOKS':

            const books = action.payload
            // let currentlyReadingBooks = []
            // let completedBooks = []
            // let reviewedBooks = []
            // for (let i = 0; i < books.length; i++) {
            //     const book = books[i];

            //     if (book.isCompleted) { completedBooks.push(book) }
            //     if (!book.isCompleted) { currentlyReadingBooks.push(book) }
            //     if (book.review) { reviewedBooks.push(book) }
            // }
            // return { completedBooks, reviewedBooks, currentlyReadingBooks }
            return books
        default:
            return currentVisitedUserBookData;
    }
}