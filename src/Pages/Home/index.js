import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames/bind"
import {getAllCourses as saveUserCourses} from '../../redux/CourseRedux/action'
import Button from "../../Components/Button"
import CourseItem from "../../Components/CourseItem"
import axios from '../../api/axios'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

const GET_COURSES_URL = '/courses'

const getUserCourses = async () => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'))?.token

    const res = await axios(GET_COURSES_URL, {
        headers: { Authorization: `Bearer ${userToken}` }
    })

    return res.data.data.map(course => (
        <CourseItem 
            key={course._id}
            id={course._id}
            courseName={course.name} 
            courseAuthor="Phuoc Tai"
        />
    ))
}

function Home() {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.authen.userInfo)
    const userRole = userInfo.data.user.role
    const [apiResponse, setApiResponse] = useState('*** Courses is now loading ***')

    useEffect(() => {
        document.title = 'E-learning - Home'
        dispatch(saveUserCourses())
        getUserCourses()
            .then(result => setApiResponse(result))
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Courses</h2>
                <Button 
                    to={userRole === 'student' ? '/participate' : '/create-course'}
                    primary 
                    leftIcon={<i className="bi bi-plus-circle"></i>}
                >
                    {userRole === 'student' ? 'Participate' : 'Create'}
                </Button>
            </div>
            <div className={cx('course-list')}>
                {apiResponse}
            </div>
        </div>
    )
}

export default Home