export default (points = 0, action) => {
    switch (action.type) {
        case 'SET_POINTS_JUST_SCORED':
            return action.payload
        default:
            return points;
    }
}
