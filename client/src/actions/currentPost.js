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

export const likeCurrentPost = (postId, userId) => {
    return {
        type: 'LIKE_CURRENT_POST',
        payload: { postId, userId }
    }
}

export const dislikeCurrentPost = (postId, userId) => {
    return {
        type: 'DISLIKE_CURRENT_POST',
        payload: { postId, userId }
    }
}

export const createComment = (postId, formData, userData) => async (dispatch) => {
    try {
        const { data } = await api.createComment({ postId, formData })

        dispatch({ type: 'CREATE_COMMENT', payload: data})
    } catch (error) {
        console.log(error);
    }
}