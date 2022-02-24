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
        handleErrorInComponent('A user with that name or email already exists')
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

export const getUserInfo = (navigate, setIsLoggedIn) => async (dispatch) => { 
    try {
        const res = await api.getUserInfo()

        setIsLoggedIn(true)

        dispatch({ type: 'AUTH', payload: res.data.user })
    } catch (error) {
        console.log('get user info error: ', error);
        navigate('/auth')
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

export const updateUser = (formData) => async (dispatch, navigate) => {
    try {
        const {data} = await api.updateUser(formData)

        dispatch({ type: 'AUTH', payload: data.updatedUser })
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = () => async (dispatch, navigate) => {
    try {
        navigate('/auth')
        const deletedUser = await api.deleteUser()
        localStorage.clear()
        dispatch({ type: 'AUTH', payload: null })
    } catch (error) {
        console.log(error);
    }
}