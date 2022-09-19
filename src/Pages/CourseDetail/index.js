import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import classNames from "classnames/bind"
import axios from '../../api/axios'
import styles from './CourseDetail.module.scss'

const cx = classNames.bind(styles)

function CourseDetail() {
    const courseId = useParams().id
    const courseStore = useSelector(state => state.course)
    const currentCourse = courseStore.userCourses.find(course => course._id === courseId)

    const activeTopic = localStorage.getItem('activeTopic') ?? ''

    const [topics, setTopics] = useState([])
    const [hideLessons, setHideLessons] = useState([])

    const lessonsRef = useRef([])

    const handleToggleLesson = index => {
        const newHideLessons = hideLessons.map((value, _index) => {
            if (_index === index) {
                return !value
            }
            return true
        })
        
        const lessons = topics[index].lessons

        if (lessons.length === 0) {
            lessonsRef.current[index].style.border = 'none'
            lessonsRef.current[index].style.padding = '1px'    
        }

        if (newHideLessons[index]) {
            localStorage.removeItem('activeTopic')
        } else {
            localStorage.setItem('activeTopic', index)
        }
        setHideLessons(newHideLessons)
    }

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('userInfo'))?.token

        axios.get('/topics', {
            headers: { Authorization: `Bearer ${userToken}` }
        })
            .then(res => {
                const topics = res.data.data
                const courseTopics = topics.filter(topic => topic.course === courseId)
                
                setTopics(courseTopics)
                setHideLessons(() => {
                    let arrHideLesson = []
                    topics.forEach((topic, index) => {
                        if (!activeTopic) {
                            arrHideLesson = [...arrHideLesson, true]
                        } else {
                            if (index === Number(activeTopic)) {
                                arrHideLesson = [...arrHideLesson, false]
                            }
                            else arrHideLesson = [...arrHideLesson, true]
                        }
                    })
                    return arrHideLesson
                })
            })
            .catch(err => {

            })
    }, [])

    useEffect(() => {
        document.title = currentCourse.name
    }, [])

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
                {topics.map((topic, index) => (
                    <div 
                        key={topic.id} 
                        className={cx('course-content__section')} 
                        onClick={() => handleToggleLesson(index)}
                    >
                        <div className={cx('course-content__section--wrapper')}>
                            <span>
                                <i className="bi bi-folder-fill"></i>
                                <span style={{marginLeft: 8}}>{topic.title}</span>
                            </span>
                            {hideLessons[index] ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>}
                        </div>
                        <ul 
                            className={cx('course-content__section--content')}
                            ref={el => lessonsRef.current[index] = el} 
                            hidden={hideLessons[index]}
                        >
                            {topic.lessons.map(lesson => (
                                <li key={lesson.id}>
                                    <i className="bi bi-bookmark-fill"></i>
                                    <a href={lesson.url} style={{marginLeft: 8}}>{lesson.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseDetail
