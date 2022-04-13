let updatedPosts
let indexOfPost
let indexOfLiker

export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_POSTS':
            return action.payload
        case 'LIKE_POST':
            updatedPosts = [...posts]
            indexOfPost = posts.findIndex((post) => post._id === action.payload.postId)

            // Check if user has already liked this post
            indexOfLiker = posts[indexOfPost].likedBy.findIndex((likerId) => likerId === action.payload.userId)

            // If the user has already liked this post remove their _id from the likedBy array
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

            // Check if user has already liked this post
            indexOfLiker = posts[indexOfPost].dislikedBy.findIndex((likerId) => likerId === action.payload.userId)

            // If the user has already liked this post remove their _id from the dislikedBy array
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
            const indexOfPostCommentedOn = posts.findIndex((post) => post._id === action.payload.postId)

            let newComment = {
                createdBy: {
                    _id: action.payload.userData._id,
                    name: action.payload.userData.name,
                    level: action.payload.userData.level
                },
                text: action.payload.formData
            }

            updatedPosts[indexOfPostCommentedOn].comments.push(newComment)

            return updatedPosts
        default:
            return posts;
    }
}