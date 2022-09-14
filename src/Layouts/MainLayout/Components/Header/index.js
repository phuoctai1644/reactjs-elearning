import classNames from "classnames/bind"
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input type="text" />
                <i class="bi bi-search"></i>
            </div>
            <div className={cx('action')}>
                <i class="bi bi-bell"></i>
                <div className={cx('user-option')}>
                    {/* <Avatar small text="T" /> */}
                    <img src="" alt="User Avatar" />
                    <i class="bi bi-caret-down-fill"></i>
                </div>
            </div>
        </div>
    )
}

export default Header
