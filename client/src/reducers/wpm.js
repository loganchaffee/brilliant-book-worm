export default (wpm = 0, action) => {
    switch (action.type) {
        case 'UPDATE_WPM':
            return action.payload
            break;
        default:
            return wpm
            break;
    }
}