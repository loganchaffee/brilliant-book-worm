import * as api from '../api/index'

export const getNotifications = () => async (dispatch) => {
    try {
        const { data } = await api.fetchNotifications()

        dispatch({type: 'FETCH_NOTIFICATIONS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const markNotificationAsRead = (id) => async (dispatch) => {
    try {
        const { data } = await api.markNotificationAsRead({ id })

        dispatch({type: 'MARK_NOTIFICATION_AS_READ', payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const deleteNotification = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteNotification({ id })
        dispatch({ type: 'DELETE_NOTIFICATION', payload: id})
    } catch (error) {
        console.log(error);
    }
}