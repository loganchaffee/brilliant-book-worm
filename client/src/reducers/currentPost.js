let updatedPost
let indexOfLiker

export default (currentPost = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_POST':
            return action.payload
        case 'CREATE_COMMENT':
            console.log(action.payload);
            return { ...currentPost, comments: action.payload.comments }
        case 'DELETE_COMMENT':
            updatedPost = { ...currentPost }
            const deletedCommentIndex = updatedPost.comments.findIndex((comment) => comment._id === action.payload.commentId)
            if (deletedCommentIndex > -1) updatedPost.comments.splice(deletedCommentIndex, 1)

            return updatedPost
        case 'LIKE_CURRENT_POST':
            updatedPost = { ...currentPost }
            if (!updatedPost._id) return currentPost

            // Un-dislike if post is already disliked
            indexOfLiker = updatedPost.dislikedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                console.log('removing dislike');
                const dislikedBy = [...updatedPost.dislikedBy]
                dislikedBy.splice(indexOfLiker, 1)
                updatedPost.dislikedBy = dislikedBy
            }

            // Like if post is not yet liked
            indexOfLiker = updatedPost.likedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                console.log('already liked, removing like');
                const likedBy = [...updatedPost.likedBy]
                likedBy.splice(indexOfLiker, 1)
                updatedPost.likedBy = likedBy
                return updatedPost
            }
            console.log('not yet liked, adding like');
            updatedPost.likedBy.push(action.payload.userId)

            return updatedPost
        case 'DISLIKE_CURRENT_POST':
            updatedPost = { ...currentPost }
            if (!updatedPost._id) return currentPost

            // Un-like if post is already liked
            indexOfLiker = updatedPost.likedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                const likedBy = [...updatedPost.likedBy]
                likedBy.splice(indexOfLiker, 1)
                updatedPost.likedBy = likedBy
            }

            // Dislike if post is not yet disliked
            indexOfLiker = updatedPost.dislikedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                const dislikedBy = [...updatedPost.dislikedBy]
                dislikedBy.splice(indexOfLiker, 1)
                updatedPost.dislikedBy = dislikedBy
                return updatedPost
            }
            updatedPost.dislikedBy.push(action.payload.userId)

            return updatedPost
        default:
            return currentPost
    }
}