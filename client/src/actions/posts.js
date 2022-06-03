import * as api from '../api'

export const getPosts = (postsLength) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts({ postsLength })

        dispatch({ type: 'FETCH_ALL_POSTS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (postId, userId) => async (dispatch) => {
    try {
        api.likePost({ postId, userId })

        dispatch({ type: 'LIKE_POST', payload: { postId, userId }})
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = (postId, userId) => async (dispatch) => {
    try {
        api.dislikePost({ postId, userId })

        dispatch({ type: 'DISLIKE_POST', payload: { postId, userId }})
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        const { data } = api.deleteComment({ postId, commentId })

        dispatch({ type: 'DELETE_COMMENT', payload: { postId, commentId }})
    } catch (error) {
        console.log(error);
    }
}