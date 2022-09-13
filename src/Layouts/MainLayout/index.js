import classNames from 'classnames/bind'
import SideBar from './Components/Sidebar'
import Status from './Components/Status'
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)

function MainLayout({children}) {
    console.log('Mainlayout re-render')
    return (
        <div className={cx('container')}>
            <SideBar />
            <div className={cx('content')}>
                <Status />
                { children }
            </div>
            <div className={cx('right-sidebar')}>
                {/* <Header /> */}
                <div>
                    {/* Deadlines */}
                    {/* Timelines */}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
