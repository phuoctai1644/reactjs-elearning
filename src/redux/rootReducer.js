import { combineReducers } from "redux";
import AuthenReducer from "./AuthenRedux/reducer";
import CourseReducer from "./CourseRedux/reducer";

const rootReducer = combineReducers({
    authen: AuthenReducer,
    course: CourseReducer
})

export default rootReducer
