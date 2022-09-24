import classNames from "classnames/bind"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './Error.module.scss'

const cx = classNames.bind(styles)

function Error() {
    const navigate = useNavigate()
    const [count, setCount] = useState(5)

    setTimeout(() => {
        setCount(count-1)
        if (count === 0) navigate('/')
    }, 1000)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('status')}>
                <span>4</span>
                <div className={cx('icon')}>
                    <i className="bi bi-question-circle"></i>
                </div>
                <span>4</span>
            </div>
            <div className={cx('message')}>
                <span>You have not logged in before! We will redirect you back to Login page in {count}s or click here to back now</span>
            </div>
        </div>
    )
}

export default Error
