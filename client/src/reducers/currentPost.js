let updatedPosts
export default (currentPost = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_POST':
            return action.payload
        case 'CREATE_COMMENT':
            return action.payload
        case 'DELETE_COMMENT':
            const updatedPost = { ...currentPost }
            const deletedCommentIndex = updatedPost.comments.findIndex((comment) => comment._id === action.payload.commentId)
            if (deletedCommentIndex > -1) updatedPost.comments.splice(deletedCommentIndex, 1)

            return updatedPost
        default:
            return currentPost
    }
}