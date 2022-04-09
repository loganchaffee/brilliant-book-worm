
export default (currentVisitedUser = null, action) => {
    switch (action.type) {
        case 'SET_CURRENT_VISITED_USER':
            return action.payload
        case 'RESET':
            return null
        default:
            return currentVisitedUser;
    }
}