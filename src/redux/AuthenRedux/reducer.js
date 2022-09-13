import { LOGIN_FAILURE, LOGIN_SUCCESS, LOG_OUT, REGISTER_FAILURE, REGISTER_SUCCESS, SET_CURRENT_AUTHEN_PAGE } from "./type"

const userInfo = JSON.parse(localStorage.getItem('userInfo')) ?? {}

const initState = {
    isRegistering: window.location.pathname === '/register' ? true : false,
    registerSuccess: false,
    loginSuccess: Object.keys(userInfo).length === 0 ? false : true,
    userInfo: userInfo,
}

const AuthenReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return state

        case REGISTER_FAILURE:
            localStorage.setItem('registerErr', JSON.stringify(action.payload))
            return state
            
        case LOGIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload))

            return {
                ...state, 
                userInfo: action.payload,
                loginSuccess: true
            }

        case LOGIN_FAILURE:
            return {
                ...state, 
                loginSuccess: false
            }
        
        case SET_CURRENT_AUTHEN_PAGE:
            localStorage.removeItem('registerErr')

            return {
                ...state,
                isRegistering: !state.isRegistering,
            }
        
        case LOG_OUT:
            return {
                isRegistering: false,
                registerSuccess: false,
                loginSuccess: false,
                userInfo: {}
            }
        
        default:
            return state
    }
} 

export default AuthenReducer
