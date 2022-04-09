
export default (currentPost = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_POST':
            return action.payload
        default:
            return currentPost;
    }
}