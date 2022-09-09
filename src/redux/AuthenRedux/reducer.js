import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS, SET_CURRENT_AUTHEN_PAGE } from "./type"

const userInfo = JSON.parse(localStorage.getItem('userInfo')) ?? {}

const initState = {
    isRegistering: window.location.pathname === '/register' ? true : false,
    registerSuccess: true,
    userInfo: userInfo,
}

const AuthenReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            break

        case REGISTER_FAILURE:
            localStorage.setItem('registerErr', JSON.stringify(action.payload))
            break
            
        case LOGIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload))

            return {
                ...state, 
                userInfo: action.payload,
            }

        case LOGIN_FAILURE:
            break;
        
        case SET_CURRENT_AUTHEN_PAGE:
            localStorage.removeItem('registerErr')

            return {
                ...state,
                isRegistering: !state.isRegistering,
            }
        
        default:
            return state
    }
} 

export default AuthenReducer
