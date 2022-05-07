export default (notifications = [], action) => {
    switch (action.type) {
        case 'FETCH_NOTIFICATIONS':
            return action.payload
        case 'MARK_NOTIFICATION_AS_READ':
            const arr = [...notifications]
            console.log(action.payload);
            const index = arr.findIndex((notification) => notification._id === action.payload)
            arr[index].viewed = true
            return arr;
        default:
            return notifications;
    }
}