import * as api from '../api'

export const signup = (formData) => async (dispatch) => {
    try {
        const res = await api.signup(formData)
        const data = res.data

        localStorage.setItem('user', JSON.stringify(data.accessToken))

        dispatch({ type: 'AUTH', payload: data.user })
    } catch (error) {
        console.log(error);
    }
}
 
export const signin = (formData) => async (dispatch) => {
    try {
        const res = await api.signin(formData)
        const data = res.data
        localStorage.setItem('user', JSON.stringify(data.accessToken))

        dispatch({ type: 'AUTH', payload: data.user })
    } catch (error) {
        console.log(error);
    }
}

export const getUserInfo = () => async (dispatch) => {
    try {
        const res = await api.getUserInfo()
        const user = res.data.user

        dispatch({ type: 'AUTH', payload: user })
    } catch (error) {
        console.log(error);
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