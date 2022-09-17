import classNames from 'classnames/bind'
import Deadline from './Components/Deadline'
import Header from './Components/Header'
import SideBar from './Components/Sidebar'
import Status from './Components/Status'
import Timeline from './Components/Timeline'
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)

function MainLayout({children}) {
    return (
        <div className={cx('container')}>
            <SideBar />
            <div className={cx('content')}>
                <Status />
                { children }
            </div>
            <div className={cx('right-sidebar')}>
                <Header />
                <div>\
                    {/* <Deadline /> */}
                    {/* <Timeline /> */}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
