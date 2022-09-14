import { CREATE_COURSE_SUCCESS, GET_COURSES_SUCCESS } from "./type"

const initState = {
    userCourses: JSON.parse(localStorage.getItem('userCourses')) ?? []
}

const CourseReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_COURSE_SUCCESS:
            const updatedUserCourses = [...state.userCourses, action.payload]

            return {
                ...state,
                userCourses: updatedUserCourses
            }

        case GET_COURSES_SUCCESS:
            return {
                ...state, 
                userCourses: [...action.payload]
            }
            
        default:
            return state
    }
}

export default CourseReducer
