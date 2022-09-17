import axios from '../../api/axios'
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOG_OUT, REGISTER_FAILURE, REGISTER_SUCCESS, RESET_PASSWORD_FAILURE, SET_CURRENT_AUTHEN_PAGE } from "./type"

const LOGIN_URL = '/auth/login'
const REGISTER_URL = '/auth/signup'
const RESET_PASSWORD_URL = '/auth/resetPassword'

export const register = payload => {
    return dispatch => {
        axios.post(REGISTER_URL, payload) 
            .then(res => {
                dispatch(registerSuccess())
                console.log("Register Successfully!!!")
            })
            .catch(err => {
                const errMsg = {...err.response.data.error.errors.validationError}
                
                dispatch(registerFailure(errMsg))
                console.log('Register failure!!!')
            })
    }

    function registerSuccess() {
        return {
            type: REGISTER_SUCCESS
        }
    }

    function registerFailure(payload) {
        return {
            type: REGISTER_FAILURE,
            payload
        }
    }
}

export const login = payload => {
    return dispatch => {
        axios.post(LOGIN_URL, payload) 
            .then(res => {
                const userInfo = res.data

                dispatch(loginSuccess(userInfo))
                console.log('Login successfully!!!')
            })
            .catch(err => {
                dispatch(loginFailure())
                console.log('Login failure!!!')
            })
    }

    function loginFailure() {
        return {
            type: LOGIN_FAILURE,
        }
    }
}

export const setCurrentAuthenPage = () => {
    return {
        type: SET_CURRENT_AUTHEN_PAGE
    }
}

export const logOut = () => {
    localStorage.removeItem('userInfo')

    return {
        type: LOG_OUT
    }
}

export const resetPassword = (resetToken, payload) => {
    return dispatch => {
        axios.post(`${RESET_PASSWORD_URL}/${resetToken}`, payload)
            .then(res => {
                const newUserInfo = res.data

                dispatch(loginSuccess(newUserInfo))
                console.log('Reset password successfully!!!')
            })
            .catch(err => {
                const errMsg = err.response.data.error.errors.validationError
                dispatch(resetFailure(errMsg))
                console.log('Reset password failure!!!')
            })
    }

    function resetFailure(payload) {
        return {
            type: RESET_PASSWORD_FAILURE,
            payload
        }
    }
}

/** Global **/
const loginSuccess = payload => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}
