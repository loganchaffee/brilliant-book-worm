import * as api from '../api'

export const fetchVisitedUserBooks = (visitedUserId) => async (dispatch) => {
    try {
        const { data } = await api.fetchVisitedUserBooks({ visitedUserId })

        dispatch({ type: 'SET_CURRENT_VISITED_USER_BOOKS', payload: data })
    } catch (error) {
        console.log(error);
    }
}