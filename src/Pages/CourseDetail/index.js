import classNames from "classnames/bind"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './CourseDetail.module.scss'

const cx = classNames.bind(styles)

function CourseDetail() {
    const courseId = useParams().id
    const courseStore = useSelector(state => state.course)
    const currentCourse = courseStore.userCourses.find(course => course._id === courseId)

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('course-title')}>{currentCourse.name}</h1>
            <hr />
            <ul className={cx('course-nav')}>
                <li className={cx('active')}>Documents</li>
                <li>Videos</li>
                <li>Forum</li>
                <li>Participants</li>   
            </ul>

            <div className={cx('course-content')}>
                <div className={cx('course-content__section')}>
                    <div className={cx('course-content__section--wrapper')}>
                        <span>
                            <i className="bi bi-folder-fill"></i>
                            <span style={{marginLeft: 8}}>General</span>
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </div>
                    {/* <ul className={cx('course-content__section--content')}>
                        <li><a href="">Chapter 1: Overview + Introduction</a></li>
                        <li><a href="">Chapter 1: Overview + Introduction</a></li>
                    </ul> */}
                </div>

                <div className={cx('course-content__section')}>
                    <div className={cx('course-content__section--wrapper')}>
                        <span>
                            <i className="bi bi-folder-fill"></i>
                            <span style={{marginLeft: 8}}>General</span>
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </div>
                </div>

                <div className={cx('course-content__section')}>
                    <div className={cx('course-content__section--wrapper')}>
                        <span>
                            <i className="bi bi-folder-fill"></i>
                            <span style={{marginLeft: 8}}>General</span>
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </div>
                </div>

                <div className={cx('course-content__section')}>
                    <div className={cx('course-content__section--wrapper')}>
                        <span>
                            <i className="bi bi-folder-fill"></i>
                            <span style={{marginLeft: 8}}>General</span>
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </div>
                </div>

                <div className={cx('course-content__section')}>
                    <div className={cx('course-content__section--wrapper')}>
                        <span>
                            <i className="bi bi-folder-fill"></i>
                            <span style={{marginLeft: 8}}>General</span>
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
