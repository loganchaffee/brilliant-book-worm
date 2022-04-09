const authReducer = (user = null, action) => {
    switch (action.type) {
        case 'AUTH':
            return action.payload
        case 'FOLLOW':
            return { ...user, following: [...user.following, action.payload]};
        case 'UNFOLLOW':
            let following = user.following
            const indexOfFollowee = following.findIndex((followee) => followee._id === action.payload)
            following.splice(indexOfFollowee, 1)
            return { ...user, following: following};
        default:
            return user;
    }
}

export default authReducer