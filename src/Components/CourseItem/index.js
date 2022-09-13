import classNames from "classnames/bind"
import Button from "../Button"
import styles from './CourseItem.module.scss'

const cx = classNames.bind(styles)

function CourseItem(props) {
    return (
        <div className={cx('wrapper')} dataid={props.id}>
            <img src="/" alt={props.courseName}/>
            <div className={cx('info')}>
                <h3>{props.courseName}</h3>
                <p>by {props.courseAuthor}</p>
            </div>
            {/* <button>View course</button> */}
            <Button outline>View course</Button>
        </div>
    )
}

export default CourseItem
