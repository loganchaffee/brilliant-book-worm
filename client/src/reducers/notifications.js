export default (notifications = [], action) => {
    switch (action.type) {
        case 'FETCH_NOTIFICATIONS':
            return action.payload
        case 'MARK_NOTIFICATION_AS_READ':
            const arr = [...notifications]
            const index = arr.findIndex((notification) => notification._id === action.payload)
            arr[index].viewed = true
            return arr
        case 'DELETE_NOTIFICATION':
            const arr2 = [...notifications]
            const index2 = arr2.findIndex((notification) => notification._id === action.payload)
            if (index2 === -1) return notifications
            arr2.splice(index2, 1)
            return arr2
        default:
            return notifications;
    }
}