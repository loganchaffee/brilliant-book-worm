let updatedPosts
let indexOfPost
let indexOfLiker
let indexOfPostCommentedOn

export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_POSTS':
            return [...posts, ...action.payload]
        case 'LIKE_POST':
            updatedPosts = [...posts]
            indexOfPost = posts.findIndex((post) => post._id === action.payload.postId)

            // Un-dislike if post is already disliked
            indexOfLiker = posts[indexOfPost].dislikedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                const dislikedBy = [...posts[indexOfPost].dislikedBy]
                dislikedBy.splice(indexOfLiker, 1)
                updatedPosts[indexOfPost].dislikedBy = dislikedBy
            }

            // Like if post is not yet liked
            indexOfLiker = posts[indexOfPost].likedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                const likedBy = [...posts[indexOfPost].likedBy]
                likedBy.splice(indexOfLiker, 1)
                updatedPosts[indexOfPost].likedBy = likedBy
                return updatedPosts
            }
            updatedPosts[indexOfPost].likedBy.push(action.payload.userId)

            return updatedPosts
        case 'DISLIKE_POST':
            updatedPosts = [...posts]
            indexOfPost = posts.findIndex((post) => post._id === action.payload.postId)

            // Un-like if post is already disliked
            indexOfLiker = posts[indexOfPost].likedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                const likedBy = [...posts[indexOfPost].likedBy]
                likedBy.splice(indexOfLiker, 1)
                updatedPosts[indexOfPost].likedBy = likedBy
            }

            // Dislike if post is not yet disliked
            indexOfLiker = posts[indexOfPost].dislikedBy.findIndex((likerId) => likerId === action.payload.userId)
            if (indexOfLiker > -1) {
                const dislikedBy = [...posts[indexOfPost].dislikedBy]
                dislikedBy.splice(indexOfLiker, 1)
                updatedPosts[indexOfPost].dislikedBy = dislikedBy
                return updatedPosts
            }
            updatedPosts[indexOfPost].dislikedBy.push(action.payload.userId)

            return updatedPosts
        case 'CREATE_COMMENT':
            updatedPosts = [...posts]
            indexOfPostCommentedOn = posts.findIndex((post) => post._id === action.payload._id)

            updatedPosts[indexOfPostCommentedOn].comments = action.payload.comments

            return updatedPosts
        case 'DELETE_COMMENT':
            updatedPosts = [...posts]

            indexOfPostCommentedOn = posts.findIndex((post) => post._id === action.payload.postId)

            const indexOfDeletedComment = updatedPosts[indexOfPostCommentedOn].comments.findIndex((comment) => comment._id === action.payload.commentId)
            if (indexOfDeletedComment > -1) updatedPosts[indexOfPostCommentedOn].comments.splice(indexOfDeletedComment, 1)

            return updatedPosts
        default:
            return posts;
    }
}