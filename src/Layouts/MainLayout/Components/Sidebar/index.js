import classNames from "classnames/bind"
import styles from './Sidebar.module.scss'
import images from '../../../../assets/images'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut } from "../../../../redux/AuthenRedux/action"

const cx = classNames.bind(styles)

function SideBar() {
    console.log('Sidebar re-render')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logOut())
        navigate('/')
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navigate')}>
                <img src={images.logo} alt="E-learning 1.0" width='70%' />
                <ul>
                    <li>
                        <a href="/"><i className="bi bi-house-door"></i></a>
                    </li>
                    <li>
                        <a href="/"><i className="bi bi-person"></i></a>
                    </li>
                    <li>
                        <a href="/"><i className="bi bi-chat-left-dots"></i></a>
                    </li>
                    <li>
                        <a href="/"><i className="bi bi-gear"></i></a>
                    </li>
                </ul>
            </div>
            <div className={cx('logout')} onClick={handleLogout}>
                <i className="bi bi-box-arrow-left"></i>
            </div>
        </div>
    )
    
}

export default SideBar
