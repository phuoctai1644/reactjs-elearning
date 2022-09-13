import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Home from '../Pages/Home'
import CreateCourse from '../Pages/CreateCourse'


export const publicRoutes = [
    {path: '/', element: Login},
    {path: '/register', element: Register},
    {path: '/home', element: Home},
    {path: '/create-course', element: CreateCourse}
]

export const privateRoutes = [

]
