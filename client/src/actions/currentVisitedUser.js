import * as api from '../api'

export const getCurrentVisitedUser = (visitedUserId) => async (dispatch) => {
    try {
        const { data } = await api.fetchVisitedUser({ _id: visitedUserId })

        dispatch({ type: 'SET_CURRENT_VISITED_USER', payload: data.visitedUser })
    } catch (error) {
        console.log(error);
    }
}

export const resetVisitedUser = () => {
    return { type: 'RESET' }
}