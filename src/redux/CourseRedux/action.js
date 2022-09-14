import axios from "../../api/axios"
import { CREATE_COURSE_SUCCESS, GET_COURSES_SUCCESS } from "./type"

const CREATE_COURSE_URL = '/courses'
const GET_ALL_COURSES_URL = '/courses'
const userToken = JSON.parse(localStorage.getItem('userInfo'))?.token

export const createCourse = courseInfo => {
    return dispatch => {
        axios.post(CREATE_COURSE_URL, courseInfo, {
            headers: { Authorization: `Bearer ${userToken}` }
        })
            .then(res => {
                // Response so long
                const courseCreated = res.data.data.data
                dispatch(createCourseSuccess(courseCreated))
                console.log('Create new course successfully!!!')
            })
            .catch(err => {
                console.log('Create new course failure!!!')
            })
    }

    function createCourseSuccess(payload) {
        return {
            type: CREATE_COURSE_SUCCESS,
            payload
        }
    }
}

export const getAllCourses = () => {
    return dispatch => {
        axios.get(GET_ALL_COURSES_URL, {
            headers: { Authorization: `Bearer ${userToken}` }
        })
            .then(res => {
                const userCourses = res.data.data
                localStorage.setItem('userCourses', JSON.stringify(userCourses))

                dispatch(getCoursesSuccess(userCourses))
            })
            .catch(err => {})
    }

    function getCoursesSuccess(payload) {
        return {
            type: GET_COURSES_SUCCESS,
            payload
        }
    }
}
