let updatedPost
let indexOfLiker
let arr
let newDislikedBy
let newLikedBy

export default (currentPost = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_POST':
            return action.payload
        case 'CREATE_COMMENT':
            return { ...currentPost, comments: action.payload.comments }
        case 'DELETE_COMMENT':
            updatedPost = { ...currentPost }
            const deletedCommentIndex = updatedPost.comments.findIndex((comment) => comment._id === action.payload.commentId)
            if (deletedCommentIndex > -1) updatedPost.comments.splice(deletedCommentIndex, 1)

            return updatedPost
        case 'LIKE_CURRENT_POST':
            newDislikedBy = [...currentPost.dislikedBy]
            newLikedBy = [...currentPost.likedBy]
            // Remove dislike if necessary
            if (currentPost.dislikedBy.indexOf(action.payload.userId) > -1) {
                newDislikedBy = [...currentPost.dislikedBy]
                newDislikedBy.splice(currentPost.dislikedBy.indexOf(action.payload.userId), 1)
            }
            // Remove like if necessary
            if (currentPost.likedBy.indexOf(action.payload.userId) > -1) {
                newLikedBy = [...currentPost.likedBy]
                newLikedBy.splice(currentPost.likedBy.indexOf(action.payload.userId), 1)
            }
            // Add like
            if (currentPost.likedBy.indexOf(action.payload.userId) <= -1) {
                newLikedBy = [...currentPost.likedBy, action.payload.userId]
            }
            // Update state
            return { ...currentPost, dislikedBy: newDislikedBy, likedBy: newLikedBy }
        case 'DISLIKE_CURRENT_POST':
            newDislikedBy = [...currentPost.dislikedBy]
            newLikedBy = [...currentPost.likedBy]
            // Remove like if necessary
            if (currentPost.likedBy.indexOf(action.payload.userId) > -1) {
                newLikedBy = [...currentPost.likedBy]
                newLikedBy.splice(currentPost.likedBy.indexOf(action.payload.userId), 1)
            }
            // Remove dislike if necessary
            if (currentPost.dislikedBy.indexOf(action.payload.userId) > -1) {
                newDislikedBy = [...currentPost.dislikedBy]
                newDislikedBy.splice(currentPost.dislikedBy.indexOf(action.payload.userId), 1)
            }
            // Add like
            if (currentPost.dislikedBy.indexOf(action.payload.userId) <= -1) {
                newDislikedBy = [...currentPost.dislikedBy, action.payload.userId]
            }
            // Update state
            return { ...currentPost, dislikedBy: newDislikedBy, likedBy: newLikedBy }
        default:
            return currentPost
    }
}