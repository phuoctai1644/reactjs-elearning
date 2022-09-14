import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Home from '../Pages/Home'
import CreateCourse from '../Pages/CreateCourse'
import CourseDetail from '../Pages/CourseDetail'


export const publicRoutes = [
    {path: '/', element: Login},
    {path: '/register', element: Register},
    {path: '/home', element: Home},
    {path: '/create-course', element: CreateCourse},
    {path: '/course-detail/:id', element: CourseDetail}
]

export const privateRoutes = [

]
