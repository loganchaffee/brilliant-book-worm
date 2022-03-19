
export default (currentVisitedUser = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_VISITED_USER':
            return action.payload
        default:
            return currentVisitedUser;
    }
}