export default (showNotificationsModal = false, action) => {
    switch (action.type) {
        case 'TOGGLE_NOTIFICATIONS_MODAL':
            return !showNotificationsModal;
        default:
            return showNotificationsModal;
    }
}