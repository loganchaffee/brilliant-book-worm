import * as api from '../api'

export const getCurrentVisitedUser = (visitedUserId, navigate) => async (dispatch) => {
    try {
        const { data } = await api.fetchVisitedUser({ visitedUserId: visitedUserId })

        dispatch({ type: 'SET_CURRENT_VISITED_USER', payload: data.visitedUser })

        navigate('/feed/public-user')
    } catch (error) {
        console.log(error);
    }
}