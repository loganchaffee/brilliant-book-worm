import * as api from '../api'

export const fetchCurrentPost = (params) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(params)

        dispatch({ type: 'SET_CURRENT_POST', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const setCurrentPost = (post) => {
    return { type: 'SET_CURRENT_POST', payload: post }
}