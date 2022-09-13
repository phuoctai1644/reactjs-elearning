import classNames from "classnames/bind"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "../../Components/Button"
import { createCourse } from "../../redux/CourseRedux/action"
import styles from './CreateCourse.module.scss'

const cx = classNames.bind(styles)

function CreateCourse() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initCourseInfo = {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        memberLimit: '',
    }
    const [courseInfo, setCourseInfo] = useState(initCourseInfo)
    const [errMsg, setErrMsg] = useState({})

    const handleChangeCourseInfo = (e, targetAttr) => {
        setCourseInfo({...courseInfo, [targetAttr]: e.target.value})
        setErrMsg({...errMsg, [targetAttr]: ''})
    }

    const handleCreateCourse = e => {
        e.preventDefault()

        // Validate create form
        if (courseInfo.name.length < 8 || courseInfo.description.length < 8) {
            setErrMsg(() => {
                let result = {}
                if (courseInfo.name.length < 8) {
                    result = {...result, name: 'Name must be at least 8 chars long.'}
                } 
                if (courseInfo.description.length < 8) {
                    result = {...result, description: 'Description must be at least 8 chars long.'}
                }

                return result
            })
        } else {
            dispatch(createCourse(courseInfo))
            setErrMsg({})
            navigate('/home')
        }

    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Create new course</h2>
                <Button primary>Save</Button>
            </div>
            <form className={cx('form')} method="POST">
                <div className={cx('form-wrap')}>
                    <label htmlFor="course-name">Course name</label>
                    <div>
                        <input 
                            required
                            type="text"
                            name="course-name"
                            placeholder="Course name"
                            value={courseInfo.name}
                            onChange={e => handleChangeCourseInfo(e, 'name')}
                        />
                        <p className={cx('err-msg')}>{errMsg?.name ?? errMsg.name}</p>
                    </div>
                </div>
                <div className={cx('form-wrap')}>
                    <label htmlFor="start-date">Start date</label>
                    <input 
                        type="date" 
                        name="start-date"
                        value={courseInfo.startDate}
                        onChange={e => handleChangeCourseInfo(e, 'startDate')}
                    />
                </div>
                <div className={cx('form-wrap')}>
                    <label htmlFor="end-date">End date</label>
                    <input 
                        type="date" 
                        name="end-date"
                        value={courseInfo.endDate}
                        onChange={e => handleChangeCourseInfo(e, 'endDate')}
                    />
                </div>
                <div className={cx('form-wrap')}>
                    <label>Description</label>
                    <div>
                        <textarea
                            value={courseInfo.description}
                            onChange={e => handleChangeCourseInfo(e, 'description')}
                        ></textarea>
                        <p className={cx('err-msg')}>{errMsg?.description ?? errMsg.description}</p>
                    </div>
                </div>
                <div className={cx('form-wrap')}>
                    <label>Member Limit</label>
                    <div>
                        <input 
                            required 
                            type="number" 
                            value={courseInfo.memberLimit}
                            onChange={e => handleChangeCourseInfo(e, 'memberLimit')}
                        />
                        <p className={cx('err-msg')}>{errMsg?.memberLimit ?? errMsg.memberLimit}</p>
                    </div>
                </div>

                <Button primary onClick={handleCreateCourse}>Save</Button>
            </form>
        </div>
    )
}

export default CreateCourse
