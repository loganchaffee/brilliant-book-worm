import * as api from '../api'

export const signup = (formData, navigate, handleErrorInComponent) => async (dispatch) => {
    try {
        const res = await api.signup(formData)
        const data = res.data

        localStorage.setItem('user', JSON.stringify(data.accessToken))

        navigate('/')

        dispatch({ type: 'AUTH', payload: data.user })
    } catch (error) {
        console.log(error);
        handleErrorInComponent(error.response.data)
    }
}
 
export const signin = (formData, navigate, handleErrorInComponent) => async (dispatch) => {
    try {
        const res = await api.signin(formData)
        const data = res.data

        localStorage.setItem('user', JSON.stringify(data.accessToken))

        navigate('/')

        dispatch({ type: 'AUTH', payload: data.user })
    } catch (error) {
        console.log(error.message);
        handleErrorInComponent('Wrong user name or password')
    }
}

export const getUserInfo = (navigate, setIsLoading) => async (dispatch) => { 
    try {
        const res = await api.getUserInfo()
        dispatch({ type: 'AUTH', payload: res.data.user })
        setIsLoading(false)
    } catch (error) {
        console.log('get user info error: ', error);
        // navigate('/auth')
    }
}

export const signout = () => async (dispatch) => {
    try {
        localStorage.clear()
        dispatch({ type: 'AUTH', payload: null })
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = () => async (dispatch, navigate) => {
    try {
        const deletedUser = await api.deleteUser()
        localStorage.clear()
        dispatch({ type: 'AUTH', payload: null })
    } catch (error) {
        console.log(error);
    }
}

/**
 * Sends user data to server, receives updated user data, passes updated user data to redux reducer
 * Two optional functions to handle page redirects
 * @param {object} formData Modified user object
 * @param {function} setErrorMessage Update errorMessage state in component it was passed from
 * @param {function} navigate useNavigate hook redirects user to a different page
 * @param {string} whereToNavigate page to redirect user to
 * @return {object} Use redux thunk method "dispatch" to return an action object to redux reducer
*/
export const updateUser = (formData, setAlert, setShowSpinner) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(formData)

        if (data.accessToken) localStorage.setItem('user', JSON.stringify(data.accessToken))

        dispatch({ type: 'AUTH', payload: data.updatedUser })

        if (setAlert) setAlert({ variant: 'success', content: 'Profile successfully updated!'})

        if (setShowSpinner) setShowSpinner(false)

    } catch (error) {
        setAlert({ variant: 'success', content: error.response.data })
    }
}

export const follow = (visitedUserId, visitedUserName) => {
    api.follow({ _id: visitedUserId })

    const followee = {
        _id: visitedUserId,
        name: visitedUserName
    }

    return { type: 'FOLLOW', payload: followee }
}

export const unfollow = (visitedUserId, visitedUserName) => {
    api.unfollow({ _id: visitedUserId })

    return { type: 'UNFOLLOW', payload: visitedUserId }
}