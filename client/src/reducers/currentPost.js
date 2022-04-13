
export default (currentPost = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_POST':
            return action.payload
        // case 'LIKE_POST':
        //     if (currentPost._id) {
        //         const updatedPost = { ...currentPost } // Use temporary var (no mutation in redux)
        //         const indexOfLiker = updatedPost.likedBy.findIndex((likerId) => likerId === action.payload.userId)

        //         console.log(indexOfLiker);

        //         if (indexOfLiker > -1) {

        //             console.log('remove like');

        //             const likedBy = [...updatedPost.likedBy]
        //             likedBy.splice(indexOfLiker, 1)
        //             updatedPost.likedBy = likedBy

        //             return updatedPost
        //         }
                
        //         console.log('add like');
        //         updatedPost.likedBy.push(action.payload.userId)

        //         return updatedPost
        //     } else {
        //         return currentPost
        //     }
           
        default:
            return currentPost;
    }
}