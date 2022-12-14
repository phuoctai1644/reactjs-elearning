import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Home from '../Pages/Home'
import CreateCourse from '../Pages/CreateCourse'
import CourseDetail from '../Pages/CourseDetail'
import ForgotPassword from '../Pages/ForgotPassword'
import EditProfile from '../Pages/EditProfile'

export const publicRoutes = [
    {path: '/', element: Login},
    {path: '/register', element: Register},
    {path: '/forgot-password/:token', element: ForgotPassword},
    {path: '/home', element: Home},
    {path: '/create-course', element: CreateCourse},
    {path: '/course-detail/:id', element: CourseDetail},
    {path: '/edit-profile', element: EditProfile}
]

export const privateRoutes = [

]
