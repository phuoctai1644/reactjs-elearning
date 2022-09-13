import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styles from './Status.module.scss'

const cx = classNames.bind(styles)

function Status() {
    const userInfo = useSelector(state => state.authen.userInfo)
    const [time, setTime] = useState('')
    
    const findTime = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) {
          return setTime('Morning');
        }
        if (hrs === 1 || hrs < 17) {
          return setTime('Afternoon');
        }
        else {
          return setTime('Evening');
        }
    };
    useEffect(() => {
        findTime();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx('text')}>
                <h3>Hello {userInfo?.data?.user?.name}</h3>
                <p>Good {time}</p>
            </div>
            <img src="" alt="User avatar" />
            {/* <Avatar medium text='T' /> */}
        </div>   
    )
}

export default Status
