import axios from '../../api/axios'
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOG_OUT, REGISTER_FAILURE, REGISTER_SUCCESS, SET_CURRENT_AUTHEN_PAGE } from "./type"

const LOGIN_URL = '/auth/login'
const REGISTER_URL = '/auth/signup'

export const register = payload => {
    return dispatch => {
        axios.post(REGISTER_URL, payload) 
            .then(res => {
                dispatch(registerSuccess())
                console.log("Register Successfully!!!")
            })
            .catch(err => {
                const errMsg = {...err.response.data.errors.validationError}
                
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

    function loginSuccess(payload) {
        return {
            type: LOGIN_SUCCESS,
            payload
        }
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
