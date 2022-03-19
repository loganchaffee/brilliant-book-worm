const authReducer = (user = null, action) => {
    switch (action.type) {
        case 'AUTH':
            return action.payload
        case 'FOLLOW':
            let following = user.following
            following.push(action.payload)
            return { ...user, following: following};
        case 'UNFOLLOW':
            // Called it following1 because I need to place the user.following array into a variable and 
            // following already exists above, also i cant reassign it because it is in a different scope
            let following1 = user.following
            const indexOfFollowee = following1.findIndex((followee) => followee.id === action.payload.id)
            following1.splice(indexOfFollowee, 1)
            return { ...user, following: following1};
        default:
            return user;
    }
}

export default authReducer